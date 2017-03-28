import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class SearchService {
	public constructor(private http:AuthHttp) { }
	
	// Retrieve all contacts that match the given query
	public getUsers(query: string) {
		let params = new URLSearchParams();
		params.set('search', query)
		
		return this.http
			.get('http://0.0.0.0:5000/api/search', { search: params })
			.map(response => response.json());
	}
}