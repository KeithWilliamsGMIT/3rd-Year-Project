"""
AUTHOR:			KEITH WILLIAMS
DATE:			1/2/2017
ADAPTED:		http://stackoverflow.com/questions/12232304/how-to-implement-server-push-in-flask-framework
DESCRIPTION:	Provide a RESTful API for the application and serve the files
"""

from flask import Flask, Response, request, make_response, render_template
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS

from databases import is_username_unique, create_user, get_user, event_stream, post_message, get_messages
from models import User

import datetime
import json
import os

app = Flask(__name__)

# Researched CORS error - https://daveceddia.com/access-control-allow-origin-cors-errors-in-angular/
# Initially fixed it with the following - response.headers['Access-Control-Allow-Origin'] = '*'
# However, this would become redundant as more endpoints are added
# After furthre research I found Flask-Cors - http://flask-cors.readthedocs.io/en/latest/
CORS(app)

# flask_jwt_extended documentation - http://flask-jwt-extended.readthedocs.io/en/latest/basic_usage.html
# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)

@app.route('/api/register', methods=['POST'])
def register():
	# DEFINE CRITERIA FOR REGISTRATION
	MINIMUM_PASSWORD_LENGTH = 8
	
	body = request.get_json()
	username = body['username']
	password = body['password']
	confirmPassword = body['confirmPassword']
	
	# Check if username is not empty
	if len(username) < 1:
		return json.dumps({"status": "error", "message": "Hey, you forgot the username!"})
	
	# Check if the username is taken
	elif not is_username_unique(username):
		return json.dumps({"status": "error", "message": "Hey, that username is taken!"})
	
	# Check that the password is not too short
	elif len(password) < MINIMUM_PASSWORD_LENGTH:
		return json.dumps({"status": "error", "message": "Hey, your password is too short. It needs to be at least " + str(MINIMUM_PASSWORD_LENGTH) + " characters!"})
	
	# Check if the two passwords match
	elif password != confirmPassword:
		return json.dumps({"status": "error", "message": "Hey, the two passwords you entered didn't match!"})
	
	# Otherwise the registration was successful
	else:
		# Create a user object with a username and password.
		# The false value that is passed in as an arguement means the password is currently
		# unencrypted and that it should be encrypted when the user object is created.
		# Return the object in json format.
		user_data = User(username, password, False).to_json()
		
		# Create and store the user in the database
		create_user(user_data)
		return json.dumps({"status": "success", "message": "Hooray! You're now signed up!" })

@app.route('/api/login', methods=['POST'])
def login():
	body = request.get_json()
	username = body['username']
	password = body['password']
	
	# Get the user with that username from the database
	user_data = get_user(username)
	
	# If a user with that username exists
	if user_data is None:
		return json.dumps({"status": "error", "message": "Hey, thats the wrong username!"})
	else:
		# Create a user object from the user_data
		user = User(user_data['username'], user_data['password'], True)
		
		# Check if the password matches the password stored in the database
		if not user.verify_password(password):
			return json.dumps({"status": "error", "message": "Hey, that username and password don't match!"})
		else:
			# Generate an access token using an identity
			# An identity can be any data that is json serializable
			access_token = create_access_token(identity=username)
			return json.dumps({"status": "success", "message": "You're now logged in!", "access_token": access_token})

@app.route('/api/search', methods=['GET'])
@jwt_required
def search():
	search = request.args.get('search')
	
	# Test user data. This will be a list of users, whose usernames match the query. They will be retrieved from the database.
	users = json.dumps([{"username": "test1"}, {"username": "test2"}])
	
	return json.dumps({"status": "success", "query": search, "message": "The list of users were retrieved!", "users": users})
	
@app.route('/api/<channel>/message', methods=['POST'])
@jwt_required
def message(channel):
	# Get data from body of request. Convert byte string into unicode string
	body = request.get_json()
	message = body['message']
	
	# Access the identity of the current user
	username = get_jwt_identity()
	
	now = datetime.datetime.now()
	
	# Create a JSON representation of the message
	data = {"channel": channel, "sender": username, "message": message, "date": now.isoformat()}
	
	post_message(channel, data)
	
	# Must return something to avoid the "ValueError: View function did not return a response" error
	return json.dumps({"status": "OK"})

@app.route('/api/<channel>/messages', methods=['GET'])
@jwt_required
def messages(channel):
	return get_messages(channel)

@app.route('/api/<channel>/stream')
#@jwt_required
def stream(channel):
	return Response(event_stream(channel), mimetype="text/event-stream")

if __name__ == '__main__':
	app.debug = True
	
	# The secret key is used to generate access tokens
	app.secret_key = os.urandom(24)
	
	# Set the host to 0.0.0.0 to make it accessible to other
	app.run(host="0.0.0.0", threaded=True)
