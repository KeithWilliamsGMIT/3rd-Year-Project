import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
	selector: 'search-menu',
	templateUrl: './search-menu.component.html',
	styleUrls: ['./search-menu.component.scss']
})

export class SearchMenuComponent {
	public constructor(private router:Router) {}
	
	// Go to the contacts page
	public onClickBack(): void {
		this.router.navigate(['contacts']);
	}
}