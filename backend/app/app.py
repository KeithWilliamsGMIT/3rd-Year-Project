"""
AUTHOR:			KEITH WILLIAMS
DATE:			1/2/2017
ADAPTED:		http://stackoverflow.com/questions/12232304/how-to-implement-server-push-in-flask-framework
DESCRIPTION:	Provide a RESTful API for the application and serve the files
"""

from flask import Flask, Response, request, make_response, render_template, session
from databases import event_stream, post_message, get_messages
from flask_cors import CORS
import datetime
import json

app = Flask(__name__)

# Researched CORS error - https://daveceddia.com/access-control-allow-origin-cors-errors-in-angular/
# Initially fixed it with the following - response.headers['Access-Control-Allow-Origin'] = '*'
# However, this would become redundant as more endpoints are added
# After furthre research I found Flask-Cors - http://flask-cors.readthedocs.io/en/latest/
CORS(app)

@app.route("/")
def index(**kwargs):
	return make_response(render_template('index.html'))

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
