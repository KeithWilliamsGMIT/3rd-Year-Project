import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { routes } from './app.routes';
import { DefaultRequestOptions } from './app.requests';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
	imports: [
		BrowserModule,
		// Need HttpModule for making HTTP requests in services -
		// http://stackoverflow.com/questions/33721276/angular-2-no-provider-for-http
		HttpModule,
		FormsModule,
		RouterModule.forRoot(routes)
	],
	declarations: [
		ContactsComponent,
		MessagesComponent,
		AppComponent
	],
	providers: [ {provide: RequestOptions, useClass: DefaultRequestOptions } ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }