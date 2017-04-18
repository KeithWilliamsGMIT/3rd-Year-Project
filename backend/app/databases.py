"""
AUTHOR:			KEITH WILLIAMS
DATE:			14/2/2017
DESCRIPTION:	Manage all database interactions
"""

# PyMongo was the recommended python driver for MongoDB at
# https://docs.mongodb.com/ecosystem/drivers/python/
import pymongo
import redis

# http://api.mongodb.com/python/current/api/bson/json_util.html
from bson.json_util import dumps
import json

# Redis information
REDIS_HOST='localhost'
REDIS_PORT=6379
REDIS_PASSWORD=''

# Connect to Redis
red = redis.Redis(
	host=REDIS_HOST,
	port=REDIS_PORT, 
	password=REDIS_PASSWORD,
	decode_responses=True)

# Mongo information
MONGO_HOST='localhost'
MONGO_PORT=27017

# Connect to Mongo
mongo = pymongo.MongoClient(
	MONGO_HOST,
	MONGO_PORT)

# Get the Mongo database
mongodb = mongo['test-database']

# Get the collection of users
users_collection = mongodb['users-collection']

# Get the collection of contacts
contacts_collection = mongodb['contacts-collection']

# Get the collection of messages
messages_collection = mongodb['messages-collection']

def is_username_unique(username):
	# Return the user document with the given username if it exists
	# Otherwise return None
	users_with_username = users_collection.find_one({'username': username})
	
	# If None was returned the username is unique and return true
	return users_with_username == None

# Create a new user document in MongoDB
def create_user(user):
	# Create a new document with the users data in the users collection in the mongo database
	users_collection.insert_one(user)

# Retrieve and return a user document with a matching username from MongoDB
def get_user(username):
	# Get the document or None if no user document with the given username exists
	user = users_collection.find_one({'username': username})
	
	return user

# Retrieve and return all user documents from MongoDB that match the search
def search_users(search, current_user):
	# Get a list of the current users contacts
	contacts = contacts_collection.aggregate([
			# Get contact documents where the current user is in the list of users.
			# Only return the username, ignore all other properties.
			{ "$match": {
					'users': current_user,
				}
			},
			
			# Break array into seperate objects
			{ "$unwind": "$users" },
			
			# Ignore the resulting objects that have the current users username
			{ "$match": {
					'users': {"$ne": current_user}
				}
			},
			
			{ "$project": {
					'_id': 0,
					'username': "$users",
				}
			 }
		])
	
	# Define an empty list called usernames
	usernames = []
	
	# Loop through the contact documents returned from mongoDB and
	# append each username to the usernames list
	for doc in contacts:
		usernames.append(doc['username'])
	
	# This query will return all users that match the search except for the
	# user that is currently logged in and their contacts. This is a case
	# insensitive search. Only return the usernames.
	
	# NOTE: A more efficient way to perform this search would be to store
	# another property in every user document called lower_username which will
	# be the lowercase value of the username and then match the lowercase search
	# string against that rather than using a case insensitive search. This
	# would be more efficent as it could use indexes.
	users = users_collection.find({"$and": [ {'username': {'$regex': search, '$options': 'i'}}, {'username': { '$ne': current_user}}, {'username': {'$nin': usernames}} ]}, { 'username': 1, '_id': 0 })
	
	# The dumps() method is used to create a JSON representation of the data.
	return dumps(users)

# Return true if the given users are not already contacts
def has_contact(current_user, username):
	# Return the contact document where the two given usernames are in the list of usernames
	# if it exists, otherwise return None
	contacts = contacts_collection.find_one({ "$and": [ { 'users': current_user }, { 'users': username } ] })
	
	# If None was returned the users are not contacts and return false
	return contacts != None

# Add the two users to a new contact document with a unique channel identifier
def add_contact(current_user, username, timestamp, channel):
	# Create a new JSON object containing the contact data
	contact = {"users": [current_user, username], "created": timestamp, "channel": channel}
	
	# Create a new document with the contact data in the contacts collection in MongoDB
	contacts_collection.insert_one(contact)

# Delete the contact document that has the two given users in the users list
def delete_contact(current_user, username):
	# Delete the document
	contacts_collection.delete_one({'users': { "$all" : [current_user, username] }})

# Return all the users who are listed as the given users contact
def get_contacts(username):
	# Query MongoDB for a list of the current users contacts
	# Return a list of objects containing the contacts usernames
	contacts = contacts_collection.aggregate([
			# Get documents where the current user is in the list of users
			{ "$match": {
					'users': username,
				}
			},
			
			# Break array into seperate objects
			{ "$unwind": "$users" },
			
			# Ignore the resulting objects that have the current users username
			{ "$match": {
					'users': {"$ne": username}
				}
			},
			
			{ "$project": {
					'_id': 0,
					'contact': "$users",
					'channel': "$channel"
				}
			 }
		])
	
	# Convert the cursor object to JSON format
	return dumps(contacts)

def event_stream(channel):
	pubsub = red.pubsub()
	pubsub.subscribe(channel)
	
	for message in pubsub.listen():
		# Ignore all types except for 'message' which are the messages sent by a client.
		# For example, subscribe.
		if (message['type'] == 'message'):
			# Get the data property of the object. The data property contains the data that
			# was published to the channel, in this case it is the message.
			data = message['data']

			# The new line characters (\n) are required
			yield 'data: %s\n\n' % data

# Publish data to the Reis channel and save to MongoDB for persistance
def post_message(channel, data):
	# Publish to Redis channel first as it should be published before being written to mongo
	# for persistance. The JSON must be converted to a string or it will be returned as a
	# byte string.
	red.publish(channel, json.dumps(data))
	
	# Then add the message to the messages collection in the mongo database for persistance
	messages_collection.insert_one(data)

# Get all the previous messages from the given channel
def get_messages(channel):
	# Get each document in the messages-collection where the channel
	# value in the document is the same as the channel the that is
	# given in the URL.
	messages = messages_collection.find({'channel': channel})
	
	# The find() method returns a cursor. The dumps() method is used
	# to create a JSON representation of the data.
	return dumps(messages)