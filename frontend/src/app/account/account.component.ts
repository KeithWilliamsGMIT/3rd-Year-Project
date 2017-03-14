import { Component } from '@angular/core';

@Component({
	selector: 'account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})

export class AccountComponent {
	public onLoginForm: boolean = true;
	
	// Toggle the onLogin variable
	public toggleForm(value: boolean): void {
		this.onLoginForm = value;
	}
	
	// Called when the user chooses to login to an account
	public onLogin(): void {
		console.log("login");
	}
	
	// Called when the user chooses to register an account
	public onSignup(): void {
		console.log("signup");
	}
}