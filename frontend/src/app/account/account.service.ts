import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccountService {
	public constructor(private http:Http) { }
	
	// Submit a login request
	public postLogin(body:string) {
		return this.http
			.post('http://0.0.0.0:5000/api/login', body)
			.map(response => response.json());
	}
	
	// Submit a sign up request
	public postSignUp(body:string) {
		return this.http
			.post('http://0.0.0.0:5000/api/register', body)
			.map(response => response.json());
	}
}