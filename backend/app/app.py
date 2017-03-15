"""
AUTHOR:			KEITH WILLIAMS
DATE:			1/2/2017
ADAPTED:		http://stackoverflow.com/questions/12232304/how-to-implement-server-push-in-flask-framework
DESCRIPTION:	Provide a RESTful API for the application and serve the files
"""

from flask import Flask, Response, request, make_response, render_template
from databases import is_username_unique, create_user, event_stream, post_message, get_messages
from models import User
from flask_cors import CORS
import datetime
import json

app = Flask(__name__)

# Researched CORS error - https://daveceddia.com/access-control-allow-origin-cors-errors-in-angular/
# Initially fixed it with the following - response.headers['Access-Control-Allow-Origin'] = '*'
# However, this would become redundant as more endpoints are added
# After furthre research I found Flask-Cors - http://flask-cors.readthedocs.io/en/latest/
CORS(app)

@app.route('/api/register', methods=['POST'])
def register():
	# DEFINE CRITERIA FOR REGISTRATION
	MINIMUM_PASSWORD_LENGTH = 8
	
	data = request.get_json()
	username = data['username']
	password = data['password']
	confirmPassword = data['confirmPassword']
	
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

@app.route('/api/<channel>/message', methods=['POST'])
def message(channel):
	# Get data from body of request. Convert byte string into unicode string
	body = request.get_json()
	message = body['message']
	
	# This is a temperary username until authentication is implemented
	username = 'anonymous'
	now = datetime.datetime.now().replace(microsecond=0).time()
	
	# Create a JSON representation of the message
	data = {"channel": channel, "sender": username, "message": message, "date": now.isoformat()}
	
	post_message(channel, data)
	
	# Must return something to avoid the "ValueError: View function did not return a response" error
	return json.dumps({"status": "OK"})

@app.route('/api/<channel>/messages', methods=['GET'])
def messages(channel):
	return get_messages(channel)

@app.route('/api/<channel>/stream')
def stream(channel):
	return Response(event_stream(channel), mimetype="text/event-stream")

if __name__ == '__main__':
	app.debug = True
	
	# Set the host to 0.0.0.0 to make it accessible to other
	app.run(host="0.0.0.0", threaded=True)
