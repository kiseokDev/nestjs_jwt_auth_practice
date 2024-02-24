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

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({})],
	providers: [
		AuthService,
		LocalStrategy,
		JwtRefreshStretegy,
		JwtAccessStrategy,
	],
	exports: [AuthService, JwtRefreshStretegy, JwtAccessStrategy],
})
export class AuthModule {}
