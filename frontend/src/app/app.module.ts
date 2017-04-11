import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { DefaultRequestOptions } from './app.requests';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication-guard';
import { AuthenticationModule } from './authentication/authentication.module';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
	imports: [
		BrowserModule,
		// Need HttpModule for making HTTP requests in services -
		// http://stackoverflow.com/questions/33721276/angular-2-no-provider-for-http
		HttpModule,
		FormsModule,
		AuthenticationModule,
		RouterModule.forRoot(routes)
	],
	declarations: [
		AccountComponent,
		ContactsComponent,
		SearchComponent,
		MessagesComponent,
		AppComponent
	],
	providers: [
		{
			provide: RequestOptions,
			useClass: DefaultRequestOptions
		},
		AuthenticationGuard,
		AuthenticationService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }