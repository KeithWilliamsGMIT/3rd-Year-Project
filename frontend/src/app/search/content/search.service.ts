import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class SearchService {
	public constructor(private http:AuthHttp) { }
	
	// Retrieve all contacts that match the given query
	public getUsers(query: string) {
		// How to add URL parameters - http://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular-2
		let params = new URLSearchParams();
		params.set('search', query);
		
		return this.http
			.get('http://localhost:5000/api/search', { search: params })
			.map(response => response.json());
	}
	
	// Add the user with the given username as a contact
	public postContact(username: string) {
		return this.http
			.post('http://localhost:5000/api/contacts/' + username, '')
			.map(response => response.json());
	}
}