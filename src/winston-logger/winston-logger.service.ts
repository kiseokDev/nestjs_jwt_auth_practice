import { Logger, LoggerService } from '@nestjs/common';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
// import winstonDaily from 'winston-daily-rotate-file';
import winston from 'winston';

const isDev = process.env.NODE_ENV;
const logDir = __dirname + '/../../../logs'; // log 파일을 관리할 폴더

const dailyOptions = (level: string) => {
	return {
		level,
		datePattern: 'YYYY-MM-DD',
		dirname: logDir + `/${level}`,
		filename: `%DATE%.${level}.log`,
		maxFiles: 30, // 30일 치 로그파일 저장
		zippedArchive: true, // 로그가 쌓이면 압축하여 관리
	};
};

// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export class WinstonLogger extends Logger {
	public readonly module: LoggerService = null;

	public readonly _options: WinstonModuleOptions = {
		transports: [
			new winston.transports.Console({
				level: isDev === 'production' ? 'warn' : 'silly',
				// production 환경이라면 http, 개발환경이라면 모든 단계를 로그
				format:
					isDev === 'production'
						? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
							winston.format.simple()
						: winston.format.combine(
								winston.format.timestamp(),
								utilities.format.nestLike(
									process.env.APP_KEYWORD,
									{
										prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
										colors: true, // 로거 컬러
									},
								),
							),
			}),
			// info, warn, error 로그는 파일로 관리
			// new winstonDaily(dailyOptions('info')),
			// new winstonDaily(dailyOptions('warn')),
			// new winstonDaily(dailyOptions('error')),
		],
	};

	constructor() {
		super();
		this.module = WinstonModule.createLogger(this._options);
	}

	warn(message: any, ...args: any[]) {
		this.module.warn(message, ...args);
		this.doSomething();
	}
	log(message: any, ...args: any[]) {
		this.module.log(message, ...args);
		this.doSomething();
	}
	error(message: any, ...args: any[]) {
		this.module.error(message, ...args);
		this.doSomething();
	}

	private doSomething() {
		// 여기에 로깅에 관련된 부가 로직을 추가합니다.
		// ex. DB에 저장
	}
}
