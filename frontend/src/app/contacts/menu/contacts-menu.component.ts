import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
	selector: 'contacts-menu',
	templateUrl: './contacts-menu.component.html',
	styleUrls: ['./contacts-menu.component.scss']
})

export class ContactsMenuComponent {
public constructor(private router:Router, private authenticationService:AuthenticationService) {}
	
	// Logout go to the account page
	public onClickLogout(): void {
		this.authenticationService.logout();
		this.router.navigate(['account']);
	}
	
	// Go to the search page
	public onClickSearch(): void {
		this.router.navigate(['search']);
	}
}