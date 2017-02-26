import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
	selector: 'messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css'],
	providers: [MessagesService]
})

export class MessagesComponent implements OnInit {
	// Adding private/public to a constructor argument gives it class level scope
	public constructor(private messagesService:MessagesService) { }
	
	// Called after the constructor
	public ngOnInit(): void {
		this.messagesService.getMessages().subscribe(data => {
			// Output the data to check if it is being returned correctly
			console.log(data);
		});
	}
}