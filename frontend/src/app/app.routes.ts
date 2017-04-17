// Tutorial - https://coryrylan.com/blog/introduction-to-angular-routing

import { Routes } from '@angular/router';

import { AuthenticationGuard } from './authentication/authentication-guard';

import { AccountComponent } from './account/content/account.component';
import { ContactsComponent } from './contacts/content/contacts.component';
import { SearchComponent } from './search/content/search.component';
import { MessagesComponent } from './messages/content/messages.component';

import { AccountMenuComponent } from './account/menu/account-menu.component';
import { ContactsMenuComponent } from './contacts/menu/contacts-menu.component';
import { SearchMenuComponent } from './search/menu/search-menu.component';
import { MessagesMenuComponent } from './messages/menu/messages-menu.component';

export const routes: Routes = [
	// Make the account page the root
	{ path: '', redirectTo: '/account', pathMatch: 'full' },
	
	// Accout route
	{ path: 'account', children: [
            {
                path: '',
                component: AccountComponent
            },
            {
                path: '',
                outlet: 'menu',
                component: AccountMenuComponent
            }
        ] },
	
	// Contacts route
	{ path: 'contacts', children: [
            {
                path: '',
                component: ContactsComponent
            },
            {
                path: '',
                outlet: 'menu',
                component: ContactsMenuComponent
            }
		], canActivate: [AuthenticationGuard] },
	
	// Search route
	{ path: 'search', children: [
            {
                path: '',
                component: SearchComponent
            },
            {
                path: '',
                outlet: 'menu',
                component: SearchMenuComponent
            }
        ], canActivate: [AuthenticationGuard] },
	
	// Messages route
	{ path: 'messages/:channel', children: [
            {
                path: '',
                component: MessagesComponent
            },
            {
                path: '',
                outlet: 'menu',
                component: MessagesMenuComponent
            }
        ], canActivate: [AuthenticationGuard] }
];