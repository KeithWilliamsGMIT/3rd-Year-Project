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
	public isMessageHidden: boolean = true;
	
	public constructor(private contactsService:ContactsService, private router:Router) { }
	
	public ngOnInit(): void {
		this.isMessageHidden = true;
		
		this.contactsService.getContacts().subscribe(response => {
			// Store the list of contacts in a variable
			this.contacts = JSON.parse(response.contacts);
			
			if (this.contacts.length == 0) {
				this.isMessageHidden = false;
			}
		});
	}
	
	// Called whent he user clicks on a contact
	public onClickContact(channel: string): void {
		// Navigate to the messages page
		this.router.navigate(['messages', channel]);
	}
	
	// Called when the user clicks the removed contact button
	public onClickRemoveContact(contact: any): void {
		this.contactsService.deleteContact(contact.contact).subscribe(response => {
			// Remove the contact from the array of contacts
			let index = this.contacts.indexOf(contact, 0);
			
			if (index > -1) {
				this.contacts.splice(index, 1);
			}
			
			// Show message if all contacts were removed
			this.isMessageHidden = this.contacts.length != 0;
		});
	}
}