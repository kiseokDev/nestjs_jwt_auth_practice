export class DatabaseConnection {
	constructor(
		private options,
		private optionalProvoder?,
	) {}

	public logger() {
		console.log('options', this.options);
		console.log('optionalProvoder', this.optionalProvoder);
	}
}
