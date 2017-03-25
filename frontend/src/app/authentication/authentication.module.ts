import { NgModule } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { Http } from '@angular/http';

let authenticationService = new AuthenticationService();

function authenticationHttpServiceFactory(http: Http) {
	return new AuthHttp(new AuthConfig({
		tokenName: 'access_token',
		tokenGetter: (() => authenticationService.getToken()),
		globalHeaders: [{'Content-Type':'application/json'}]
	}), http);
}

@NgModule({
	providers: [
		{
			provide: AuthHttp,
			useFactory: authenticationHttpServiceFactory,
			deps: [Http]
		}
	]
})

export class AuthenticationModule {}