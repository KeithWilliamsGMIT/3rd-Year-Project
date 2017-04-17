import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ContactsService {
	public constructor(private http:AuthHttp) { }
	
	// Retrieve all the users contacts
	public getContacts() {
		return this.http
			.get('http://localhost:5000/api/contacts')
			.map(response => response.json());
	}
}