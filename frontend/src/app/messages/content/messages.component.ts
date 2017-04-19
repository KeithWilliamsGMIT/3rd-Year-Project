import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MessagesService } from './messages.service';
import { Message } from './message';

@Component({
	selector: 'messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
	providers: [MessagesService, Message]
})

export class MessagesComponent implements OnInit {
	// Number of documents to recieve on each get request
	readonly STEP_SIZE: number = 20;
	
	// Messages to be displayed to the user
	public messages: Object[];
	private zone: NgZone;
	private observable: Observable<any>;
	
	private channel: string;
	private sub: any;
	private isUpdating: boolean = false;
	
	@ViewChild('messagesDiv')
	private messagesDiv: ElementRef;
	
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
		
		// Retrieve a list of messages
		this.updateMessages(null);
		
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
	
	// Called when the send button is clicked
	public onSubmit(): void {
		// Only send message if it is not blank
		if (!this.message.isEmpty()) {
			this.messagesService.postMessage(JSON.stringify(this.message), this.channel).subscribe(response => {
				this.scrollToBottom();
			});
			
			this.message.clear();
		}
	}
	
	public isMessageHidden(): boolean {
		let isHidden = true
		
		// Wait for response
		if (this.messages != null) {
			isHidden = this.messages.length != 0;
		}
		
		return isHidden;
	}
	
	// Retrieve previous messages
	public onScrollUp() {
		if (!this.isUpdating) {
			// Retrieve previous messages
			this.updateMessages(this.messages[0]);
		}
	}
	
	// Retrieve messages and add to start of messages array
	private updateMessages(id: Object) {
		this.isUpdating = true;
		
		this.messagesService.getMessages(this.channel, id, this.STEP_SIZE).subscribe(response => {
			if (response.status == "success") {
				let messages = JSON.parse(response.messages);
				
				if (this.messages == null) {
					this.messages = messages;
					this.scrollToBottom();
				} else {
					// Add the messages to start of messages array
					this.messages = messages.concat(this.messages);
				}

				// Only allow another request to be sent if the full 20 messages were returned
				// Otherwise there is no more messages to retrieve
				if (messages.length == this.STEP_SIZE) {
					this.isUpdating = false;
				}
			}
		});
	}
	
	// Scroll to the bottom of the messages div
	private scrollToBottom() {
		// Scroll the messages div to end - http://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
		try {
			this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
		} catch(err) {
			console.log(err);
		}
	}
}