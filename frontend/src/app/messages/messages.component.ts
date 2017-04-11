import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../authentication/authentication.service';
import { MessagesService } from './messages.service';
import { Message } from './message';

@Component({
	selector: 'messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
	providers: [MessagesService, Message]
})

export class MessagesComponent implements OnInit {
	// Messages to be displayed to the user
	public messages: Object[];
	private zone: NgZone;
	private observable: Observable<any>;
	
	private channel: string;
	private sub: any;
	
	// Adding private/public to a constructor argument gives it class level scope
	public constructor(private authenticationService:AuthenticationService, private messagesService:MessagesService, public message:Message, private route:ActivatedRoute) {
		this.zone = new NgZone({enableLongStackTrace: false});
	}
	
	// Called after the constructor
	public ngOnInit(): void {
		// Get parameters adapted from https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
		this.sub = this.route.params.subscribe(params => {
			this.channel = params['channel'];
		});
		
		this.messagesService.getMessages(this.channel).subscribe(messages => {
			// Store the list of messages in a variable
			this.messages = messages;
		});
		
		this.observable = this.messagesService.subscribeToChannel(this.channel);
		
		this.observable.subscribe({
			next: message => {
				// Found at http://stackoverflow.com/questions/36827270/creating-an-rxjs-observable-from-a-server-sent-eventsource
				this.zone.run(() => this.messages.push(JSON.parse(message)));
			},
			error: err => {
				// TODO: Tell the user something went wrong
				console.log(err);
			}
		});
	}
	
	public onSubmit(): void {
		// Only send message if it is not blank
		if (!this.message.isEmpty()) {
			this.messagesService.postMessage(JSON.stringify(this.message), this.channel).subscribe(response => {
				
			});
			
			this.message.clear();
		}
	}
}