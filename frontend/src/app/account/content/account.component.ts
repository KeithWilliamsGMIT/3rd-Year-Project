import { Component, OnInit, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service'
import { AccountService } from './account.service';
import { LoginForm } from './login';
import { SignUpForm } from './signup';

@Component({
	selector: 'account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	providers: [AccountService, LoginForm, SignUpForm]
})

export class AccountComponent implements OnInit {
	public onLoginForm: boolean = true;
	private zone: NgZone;
	
	public constructor(private router:Router, private authenticationService:AuthenticationService, private accountService:AccountService, public loginForm:LoginForm, public signUpForm:SignUpForm) {
		this.zone = new NgZone({enableLongStackTrace: false});
	}
	
	// Called after the constructor
	public ngOnInit(): void {
		// If the user is already logged in progress to the contacts page
		if (this.authenticationService.isLoggedIn()) {
			// Go to the next page
			this.nextPage();
		}
		
		this.loginForm.rememberMe = this.authenticationService.getRememberMeValue();
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
					this.loginForm.errorMessage = response.message;
				} else {
					this.authenticate(response.access_token, this.loginForm.rememberMe);
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
					// Never remember the user when they register
					this.authenticate(response.access_token, false);
				}
			});
		});
	}
	
	private authenticate(accessToken: string, rememberMe: boolean): void {
		// Store the authentication token
		this.authenticationService.logIn(accessToken, rememberMe);
		
		// Clear both forms
		this.signUpForm.clear();
		this.loginForm.clear();
		
		// Go to the next page
		this.nextPage();
	}
	
	private nextPage() {
		// Navigate to the contacts page
		this.router.navigate(['contacts']);
	}
}