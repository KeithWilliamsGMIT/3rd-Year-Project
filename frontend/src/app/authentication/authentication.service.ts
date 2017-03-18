// Authentication guide - https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.utmuq7kjj

import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
	private readonly ACCESS_TOKEN_NAME: string = 'access_token';
	private loggedIn = false;
	
	public constructor() {
		// Check if an access token already exists in localstorage
		// If there is then the user is logged in
		this.loggedIn = !!localStorage.getItem(this.ACCESS_TOKEN_NAME);
	}
	
	// Save the given access token to localstorage and mark the user as logged in
	public logIn(accessToken:string): void {
		localStorage.setItem(this.ACCESS_TOKEN_NAME, accessToken);
		this.loggedIn = true;
	}
	
	// Remove the access token from localstorage and mark the user as not logged in
	public logout(): void {
		localStorage.removeItem(this.ACCESS_TOKEN_NAME);
		this.loggedIn = false;
	}
	
	// Return true if the user is logged in
	public isLoggedIn(): boolean {
		return this.loggedIn;
	}
}