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
	
	// Delete the contact with the given username
	public deleteContact(username: string) {
		return this.http
			.delete('http://localhost:5000/api/contacts/' + username)
			.map(response => response.json());
	}
}