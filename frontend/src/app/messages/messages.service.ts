// Tutorial - https://coursetro.com/posts/code/20/Angular-2-Services-Tutorial---Understanding-&-Creating-Them

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MessagesService {
	public constructor(private http:Http) { }
	
	// Retrieve all messages from the "const" channel from the Flask API
	public getMessages() {
		return this.http
			.get('http://0.0.0.0:5000/api/const/messages')
			.map(response => response.json());
	}
	
	// Send a message to the Flask API
	public postMessage(body:string) {
		return this.http
			.post('http://0.0.0.0:5000/api/const/message', body)
			.map(response => response.json());
	}
}