import { Component, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { AccountService } from './account.service';
import { LoginForm } from './login';
import { SignUpForm } from './signup';

@Component({
	selector: 'account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	providers: [AccountService, LoginForm, SignUpForm]
})

export class AccountComponent {
	public onLoginForm: boolean = true;
	private zone: NgZone;
	
	public constructor(private router:Router, private accountService:AccountService, public loginForm:LoginForm, public signUpForm:SignUpForm) {
		this.zone = new NgZone({enableLongStackTrace: false});
	}
	
	// Toggle the onLogin variable
	public toggleForm(value: boolean): void {
		this.onLoginForm = value;
	}
	
	// Called when the user chooses to login to an account
	public onLogin(): void {
		this.accountService.postLogin(JSON.stringify(this.loginForm)).subscribe(response => {
			this.zone.run(() => {
				if (response.status == "error") {
					console.log(response.message);
					this.loginForm.errorMessage = response.message;
				} else {
					this.progressToContacts();
				}
			});
		});
	}
	
	// Called when the user chooses to register an account
	public onSignup(): void {
		this.accountService.postSignUp(JSON.stringify(this.signUpForm)).subscribe(response => {
			this.zone.run(() => {
				if (response.status == "error") {
					this.signUpForm.errorMessage = response.message;
				} else {
					this.progressToContacts();
				}
			});
		});
	}
	
	private progressToContacts(): void {
		// Clear both forms
		this.signUpForm.clear();
		this.loginForm.clear();
		
		// Navigate to the contacts page
		this.router.navigate(['/contacts']);
	}
}