// Adapted from https://medium.com/@blacksonic86/upgrading-to-the-new-angular-2-router-255605d9da26#.q3oed6syz

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	public constructor(private authenticationService: AuthenticationService, private router: Router) {}
	
	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authenticationService.isLoggedIn()) {
			return true;
		}
		
		// If the user is not authenticated go to the account page
		this.router.navigate(['account']);
		return false;
	}
}