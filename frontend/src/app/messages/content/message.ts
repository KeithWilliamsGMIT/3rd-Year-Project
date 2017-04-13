export class Message {
	public message:string;
	
	public isEmpty(): boolean {
		return this.message == null || this.message == "";
	}
	
	public clear(): void {
		this.message = "";
	}
}