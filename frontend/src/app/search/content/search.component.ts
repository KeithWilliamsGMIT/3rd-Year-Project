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
	public onAddContactSubmit(username: string): void {
		this.searchService.postContact(username).subscribe(response => {
			console.log(response);
		});
	}
}