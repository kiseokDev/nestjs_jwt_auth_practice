import { Module } from '@nestjs/common';
// import CatServiceProvider from './cat.provider';
import { CatController } from './cat.controller';
import CatServiceProvider from './cat.provider';

@Module({
	controllers: [CatController],
	providers: [CatServiceProvider],
})
export class CatModule {}
