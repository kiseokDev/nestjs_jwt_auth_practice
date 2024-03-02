import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
	folder?: string;
}
export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig;
	constructor(@Inject(CONFIG_OPTIONS) private options: Record<string, any>) {
		const filePath = `${process.env.NODE_ENV || 'development'}.env`;
		console.log(__dirname);
		const envFile = path.resolve(
			__dirname,
			'../',
			options.folder,
			filePath,
		);
		this.envConfig = dotenv.parse(fs.readFileSync(envFile));
	}

	get(key: string): string {
		return this.envConfig[key];
	}
}
