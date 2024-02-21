import { Controller, Get, Inject } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatType } from './cat.provider';

@Controller('cat')
export class CatController {
	constructor(
		@Inject(
			process.env.NODE_ENV === 'development'
				? CatType.Dev
				: CatType.product,
		)
		private readonly catService: CatService,
	) {}

	@Get()
	findAll() {
		return this.catService.findAll();
	}
}
