import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Message } from './message';

@Component({
	selector: 'messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css'],
	providers: [MessagesService, Message]
})

export class MessagesComponent implements OnInit {
	// Messages to be displayed to the user
	public messages: Object[];
	
	// Adding private/public to a constructor argument gives it class level scope
	public constructor(private messagesService:MessagesService, public message:Message) { }
	
	// Called after the constructor
	public ngOnInit(): void {
		this.messagesService.getMessages().subscribe(messages => {
			// Store the list of messages in a variable
			this.messages = messages;
		});
	}
	
	public onSubmit(): void {
		// Only send message if it is not blank
		if (!this.message.isEmpty()) {
			this.messagesService.postMessage(JSON.stringify(this.message)).subscribe(response => {
				
			});

			this.message.clear();
		}
	}
}