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

# Get the collection of messages
messages_collection = mongodb['messages-collection']

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
	messages = messages_collection.find( {'channel': channel } )
	
	# The find() method returns a cursor. The dumps() method is used
	# to create a JSON representation of the data.
	return dumps(messages)