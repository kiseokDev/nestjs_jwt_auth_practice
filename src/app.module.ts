import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { DatabaseConnection } from './databaseConnetion';
import { ConfigModule } from './config.module';

class OptionsProvider {
	get() {
		return {
			host: 'localhost',
			port: 3306,
		};
	}
}

// const optionalProvider = 'test options';

const connectionFactory = {
	provide: 'CONNECTION',
	useFactory: (optionsProvider: OptionsProvider) => {
		const options = optionsProvider.get();
		return new DatabaseConnection(options);
	},
	inject: [OptionsProvider],
};

@Module({
	imports: [
		CatModule,
		UserModule,
		ConfigModule.forRoot({ folder: './config' }),
	],
	controllers: [AppController],
	providers: [
		AppService,
		connectionFactory,
		OptionsProvider,
		// { provide: 'SomeOptionalProvider', useValue: optionalProvider },
	],
	exports: [connectionFactory],
})
export class AppModule {}
