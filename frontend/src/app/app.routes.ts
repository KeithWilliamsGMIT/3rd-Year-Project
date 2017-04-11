// Tutorial - https://coryrylan.com/blog/introduction-to-angular-routing

import { Routes } from '@angular/router';

import { AuthenticationGuard } from './authentication/authentication-guard';
import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
	// Root
	{ path: '', redirectTo: '/account', pathMatch: 'full' },
	{ path: 'account', component: AccountComponent },
	{ path: 'contacts', component: ContactsComponent, canActivate: [AuthenticationGuard] },
	{ path: 'search', component: SearchComponent, canActivate: [AuthenticationGuard] },
	{ path: 'messages/:channel', component: MessagesComponent, canActivate: [AuthenticationGuard] }
];