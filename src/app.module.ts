import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { DatabaseConnection } from './databaseConnetion';
import { ConfigModule } from './config.module';
import { AuthModule } from './auth/auth.module';
import { WinstonLoggerMiddleware } from './winston-logger/winston-logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
	imports: [
		AuthModule,
		CatModule,
		UserModule,
		ConfigModule.forRoot({ folder: './config' }),
		TypeOrmModule.forRoot({
			// ----------------- 추가 start
			type: 'sqlite', // - DB 종류
			database: 'db.sqlite', // - DB 파일 이름
			entities: [User],
			autoLoadEntities: true, // - 구동시 entity파일 자동 로드
			synchronize: true, // - 서비스 구동시 entity와 디비의 테이블 싱크 개발만 할것
			logging: true, // - orm 사용시 로그 남기기
			// dropSchema: true, // - 구동시 해당 테이블 삭제 synchronize와 동시 사용
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		// { provide: 'SomeOptionalProvider', useValue: optionalProvider },
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(WinstonLoggerMiddleware).forRoutes('*');
	}
}
