import { Component, NgZone } from '@angular/core';
import { SearchService } from './search.service';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	providers: [SearchService]
})

export class SearchComponent {
	// Users that matched the query
	public users: Object[];
	public query: string;
	public isMessageHidden: boolean = true;
	private zone: NgZone;
	
	// Adding private/public to a constructor argument gives it class level scope
	public constructor(private searchService:SearchService) {
		this.zone = new NgZone({enableLongStackTrace: false});
	}
	
	// Called when the user clicks the search button
	public onSearchSubmit(): void {
		this.isMessageHidden = true;
		
		// Only send request if the search box contains a value
		if (this.query != null && this.query != "") {
			this.searchService.getUsers(this.query).subscribe(response => {
				this.zone.run(() => this.users = JSON.parse(response.users));
				
				if (this.users.length == 0) {
					this.isMessageHidden = false;
				}
			});
		}
	}
	
	// Called when the user clicks the add contact button on one of the results
	public onAddContactSubmit(user: any): void {
		this.searchService.postContact(user.username).subscribe(response => {
			// Remove the user from the array of users
			let index = this.users.indexOf(user, 0);
			
			if (index > -1) {
				this.users.splice(index, 1);
			}
			
			// Show message if all contacts were added
			this.isMessageHidden = this.users.length != 0;
		});
	}
}