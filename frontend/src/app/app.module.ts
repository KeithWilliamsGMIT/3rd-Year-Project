import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { routes } from './app.routes';
import { DefaultRequestOptions } from './app.requests';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication-guard';
import { AuthenticationModule } from './authentication/authentication.module';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/content/account.component';
import { ContactsComponent } from './contacts/content/contacts.component';
import { SearchComponent } from './search/content/search.component';
import { MessagesComponent } from './messages/content/messages.component';

import { AccountMenuComponent } from './account/menu/account-menu.component';
import { ContactsMenuComponent } from './contacts/menu/contacts-menu.component';
import { SearchMenuComponent } from './search/menu/search-menu.component';
import { MessagesMenuComponent } from './messages/menu/messages-menu.component';

@NgModule({
	imports: [
		BrowserModule,
		// Need HttpModule for making HTTP requests in services -
		// http://stackoverflow.com/questions/33721276/angular-2-no-provider-for-http
		HttpModule,
		FormsModule,
		InfiniteScrollModule,
		AuthenticationModule,
		RouterModule.forRoot(routes)
	],
	declarations: [
		AccountComponent,
		AccountMenuComponent,
		ContactsMenuComponent,
		ContactsComponent,
		SearchMenuComponent,
		SearchComponent,
		MessagesMenuComponent,
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