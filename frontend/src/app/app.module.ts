import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
	imports: [
		BrowserModule,
		// Need HttpModule for making HTTP requests in services -
		// http://stackoverflow.com/questions/33721276/angular-2-no-provider-for-http
		HttpModule,
		RouterModule.forRoot(routes)
	],
	declarations: [
		ContactsComponent,
		MessagesComponent,
		AppComponent
	],
	bootstrap: [ AppComponent ]
})

export class AppModule { }