import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStretegy } from './jwt-refresh.strategy';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.access_secret,
			signOptions: { expiresIn: '18s' },
		}),
		JwtModule.register({
			secret: jwtConstants.refresh_secret,
			signOptions: { expiresIn: '2m' },
		}),
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtRefreshStretegy,
		JwtAccessStrategy,
	],
	exports: [AuthService, JwtRefreshStretegy, JwtAccessStrategy],
})
export class AuthModule {}
