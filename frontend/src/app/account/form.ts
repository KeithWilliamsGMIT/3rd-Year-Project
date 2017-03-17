// This class contains variables and methods common to both the login and sign up forms

export class BaseForm {
	public username: string;
	public password: string;
	public errorMessage: string;

	public hasErrorMessage(): boolean {
		return this.errorMessage == "";
	}
	
	public clear(): void {
		this.username = "";
		this.password = "";
		this.errorMessage = "";
	}
}