// Tutorial - https://coursetro.com/posts/code/20/Angular-2-Services-Tutorial---Understanding-&-Creating-Them

/// <reference path="./see.d.ts"/>

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MessagesService {
	public constructor(private http:AuthHttp) { }
	
	// Retrieve all messages from the "const" channel from the Flask API
	public getMessages(channel: string, last: any, step: number) {
		let id: string = '0';
		
		if (last != null) {
			id = last._id.$oid;
		}
		
		let params = new URLSearchParams();
		params.append('id', id);
		params.append('step', step.toString());
		
		return this.http
			.get('http://localhost:5000/api/' + channel + '/messages', {search: params})
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