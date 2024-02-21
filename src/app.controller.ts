import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseConnection } from './databaseConnetion';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject('CONNECTION') private db: DatabaseConnection,
	) {}

	@Get()
	getHello(): string {
		this.db.logger();
		return this.appService.getHello();
	}
}
