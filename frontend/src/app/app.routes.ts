// Tutorial - https://coryrylan.com/blog/introduction-to-angular-routing

import { Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
	// Root
	{ path: '', redirectTo: '/account', pathMatch: 'full' },
	{ path: 'account', component: AccountComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'messages', component: MessagesComponent }
];