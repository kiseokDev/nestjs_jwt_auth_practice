import {
	Inject,
	Injectable,
	Logger,
	LoggerService,
	NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from './winston-logger.service';

@Injectable()
export class WinstonLoggerMiddleware implements NestMiddleware {
	// constructor(private readonly logger: Logger) {}

	use(req: Request, res: Response, next: NextFunction) {
		// 요청 객체로부터 ip, http method, url, user agent를 받아온 후
		const { ip, method, originalUrl } = req;
		const { referer } = req.headers;
		const userAgent = req.get('user-agent');

		// 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
		res.on('finish', () => {
			const { statusCode } = res;
			Logger.log(
				`${method} ${statusCode} ${originalUrl} ${ip} referer ${referer}`,
			);
		});

		next();
	}
}
