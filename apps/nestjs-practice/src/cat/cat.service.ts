import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
	findAll(): string {
		return 'This action returns all cats from service';
	}
}
