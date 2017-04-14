import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
	selector: 'messages-menu',
	templateUrl: './messages-menu.component.html',
	styleUrls: ['./messages-menu.component.scss']
})

export class MessagesMenuComponent {
	public constructor(private router:Router) {}
	
	// Go to the contacts page
	public onClickBack(): void {
		this.router.navigate(['contacts']);
	}
}