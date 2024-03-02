import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStretegy } from './strategy/jwt-refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAccessTokenGuard } from './guard/jwt/jwt-global.guard';

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({})],
	providers: [
		AuthService,
		LocalStrategy,
		JwtRefreshStretegy,
		JwtAccessStrategy,
		{
			provide: APP_GUARD,
			useClass: GlobalAccessTokenGuard,
		},
	],
	exports: [AuthService, JwtRefreshStretegy, JwtAccessStrategy],
})
export class AuthModule {}
