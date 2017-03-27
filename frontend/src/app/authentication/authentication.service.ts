// Authentication guide - https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.utmuq7kjj

import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
	private readonly REMEMBER_TOKEN_NAME: string = "remember_token";
	private readonly ACCESS_TOKEN_NAME: string = "access_token";
	private jwtHelper: JwtHelper = new JwtHelper();
	private accessToken: string;
	
	public constructor() {
		if (!!localStorage.getItem(this.REMEMBER_TOKEN_NAME)) {
			if (this.getRememberMeValue() && !!localStorage.getItem(this.ACCESS_TOKEN_NAME)) {
				this.accessToken = localStorage.getItem(this.ACCESS_TOKEN_NAME);
			}
		}
	}
	
	// Save the given access token and the remember me option to localstorage
	public logIn(accessToken:string, rememeber:boolean): void {
		this.accessToken = accessToken;
		
		// Always store the remember value
		localStorage.setItem(this.REMEMBER_TOKEN_NAME, JSON.stringify(rememeber));
		
		// Only store the access token value if remember me is true
		if (rememeber) {
			localStorage.setItem(this.ACCESS_TOKEN_NAME, accessToken);
		}
	}
	
	// Remove the access token from localstorage
	public logout(): void {
		this.accessToken = null;
		
		localStorage.removeItem(this.ACCESS_TOKEN_NAME);
	}
	
	// Return true if the user is logged in
	public isLoggedIn(): boolean {
		return this.accessToken != null && !this.jwtHelper.isTokenExpired(this.accessToken);
	}
	
	// Return the JWT from local storage
	public getToken(): string {
		return this.accessToken;
	}
	
	// Return the username of the logged in user
	public getUsername(): string {
		return this.jwtHelper.decodeToken(this.accessToken).identity;
	}
	
	// Get the remember value from localstorage and return it as a boolean
	public getRememberMeValue(): boolean {
		return !!localStorage.getItem(this.REMEMBER_TOKEN_NAME) && JSON.parse(localStorage.getItem(this.REMEMBER_TOKEN_NAME));
	}
}