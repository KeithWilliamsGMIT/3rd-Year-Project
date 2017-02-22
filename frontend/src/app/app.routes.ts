// Tutorial - https://coryrylan.com/blog/introduction-to-angular-routing

import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
	// Root
	{ path: '', redirectTo: '/messages', pathMatch: 'full' },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'messages', component: MessagesComponent }
];