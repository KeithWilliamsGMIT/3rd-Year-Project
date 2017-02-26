// Tutorial - https://coursetro.com/posts/code/20/Angular-2-Services-Tutorial---Understanding-&-Creating-Them

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MessagesService {
	public constructor(private http:Http) { }
	
	// Retrieve all messages from the "const" channel from the Flask API
	public getMessages() {
		return this.http
			.get('http://0.0.0.0:5000/api/const/messages')
			.map(response => response.json());
	}
}