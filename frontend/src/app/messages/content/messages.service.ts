// Tutorial - https://coursetro.com/posts/code/20/Angular-2-Services-Tutorial---Understanding-&-Creating-Them

/// <reference path="./see.d.ts"/>

import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MessagesService {
	public constructor(private http:AuthHttp) { }
	
	// Retrieve all messages from the "const" channel from the Flask API
	public getMessages(channel: string) {
		return this.http
			.get('http://localhost:5000/api/' + channel + '/messages')
			.map(response => response.json());
	}
	
	// Send a message to the Flask API
	public postMessage(body: string, channel: string) {
		return this.http
			.post('http://localhost:5000/api/' + channel + '/message', body)
			.map(response => response.json());
	}
	
	// Subscribe to Redis channel
	public subscribeToChannel(channel: string): Observable<any> {
		return Observable.create((observer: Observer<any>) => {
			const eventSource = new EventSource('http://localhost:5000/api/' + channel + '/stream');
			eventSource.onmessage = x => observer.next(x.data);
			eventSource.onerror = x => observer.error(x);

			return () => {
				eventSource.close();
			};
		});
	}
}