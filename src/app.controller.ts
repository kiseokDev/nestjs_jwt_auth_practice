import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guard/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { RefreshTokenGuard } from './auth/guard/refresh-token.guard';
import { Public } from './auth/decorator/public.decorator';
import { Roles } from './auth/decorator/roles.decorator';
import { RoleEnum } from './auth/enum/role.enum';

@Roles(RoleEnum.User)
@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Get()
	getHello(): string {
		return 'hello from nest js app controller';
	}
	@UseGuards(LocalAuthGuard)
	@Public() //이러면 글로벌 가드적용 안됨
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
	// === @UseGuards(AuthGuard('jwt'))
	@Get('profile')
	@Roles(RoleEnum.Admin)
	getProfile(@Request() req) {
		return req.user;
	}
	// === @UseGuards(AuthGuard('jwt'))
	@Public()
	@Get('public')
	authorizationTest(@Request() req) {
		return req.user;
	}
	@UseGuards(RefreshTokenGuard)
	@Get('auth/refresh')
	restoreAccessToken(@Request() req) {
		return this.authService.generateAccessToken(req.user);
	}
}

type User = {
	username: string;
	password: string;
	id: number;
};
