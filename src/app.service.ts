import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService) {}
	getHello(): string {
		console.log(
			'this is from appService',
			this.configService.get('kiseok'),
		);
		return 'Hello World!';
	}
}
