import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
	imports: [
		BrowserModule,
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