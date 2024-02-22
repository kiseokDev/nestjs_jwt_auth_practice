import { Module } from '@nestjs/common';
import { WinstonLogger } from './winston-logger.service';

import * as winston from 'winston';
import {
	WinstonModule,
	utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

// WinstonModule.forRoot({
// 	// options...
// });

WinstonModule.forRootAsync({
	useFactory: () => WinstonLogger.prototype._options,
	inject: [],
});

@Module({
	providers: [WinstonModule],
	exports: [WinstonModule],
})
export class WinstonModuleModule {}
