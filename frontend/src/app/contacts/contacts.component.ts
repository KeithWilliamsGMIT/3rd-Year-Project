import { Component, OnInit } from '@angular/core';
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
	
	public constructor(private contactsService:ContactsService) { }
	
	public ngOnInit(): void {
		this.contactsService.getContacts().subscribe(contacts => {
			// Store the list of contacts in a variable
			this.contacts = contacts;
			
			console.log(this.contacts);
		});
	}
}