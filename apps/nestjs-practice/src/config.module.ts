import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS, ConfigService } from './config.service';

@Module({})
export class ConfigModule {
	static forRoot(options: Record<string, any>): DynamicModule {
		return {
			module: ConfigModule,
			providers: [
				{
					provide: CONFIG_OPTIONS,
					useValue: options,
				},
				ConfigService,
			],
			exports: [ConfigService],
		};
	}
}
