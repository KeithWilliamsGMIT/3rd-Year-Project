// Override the default headers for all HTTP requests in the application
// Adapted from http://blogs.msmvps.com/theproblemsolver/2016/12/16/angular-2-and-http-request-headers/
import { Injectable } from '@angular/core';
import { Headers, BaseRequestOptions } from '@angular/http';
	
@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
	headers:Headers = new Headers({
		'Content-Type': 'application/json'
	});
}