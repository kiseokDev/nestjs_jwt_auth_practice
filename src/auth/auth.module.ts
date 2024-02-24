import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStretegy } from './strategy/jwt-refresh.strategy';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/public.guard';
import { JwtGlobalGuard } from './guard/jwt-global-guard';
import { LocalAuthGuard } from './guard/local-auth-guard';

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({})],
	providers: [
		AuthService,
		LocalStrategy,
		JwtRefreshStretegy,
		JwtAccessStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtGlobalGuard,
		},
	],
	exports: [AuthService, JwtRefreshStretegy, JwtAccessStrategy],
})
export class AuthModule {}
