import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ContactsService } from './contacts.service';

@Component({
	selector: 'contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss'],
	providers: [ContactsService]
})

export class ContactsComponent implements OnInit {
	// Contacts to display to the user
	public contacts: Object[];
	
	public constructor(private contactsService:ContactsService, private router:Router) { }
	
	public ngOnInit(): void {
		this.contactsService.getContacts().subscribe(response => {
			// Store the list of contacts in a variable
			this.contacts = JSON.parse(response.contacts);
		});
	}
	
	// Called whent he user clicks on a contact
	public onClickContact(channel: string): void {
		// Navigate to the messages page
		this.router.navigate(['messages', channel]);
	}
}