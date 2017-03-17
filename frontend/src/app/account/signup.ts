import { BaseForm } from './form';

export class SignUpForm extends BaseForm {
	public confirmPassword: string;
	
	public clear(): void {
		super.clear();
		this.confirmPassword = "";
	}
}