import {
	Controller,
	Get,
	Inject,
	Post,
	Req,
	Request,
	UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guard/local-auth-guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AccessTokenGuard } from './auth/guard/access-token.guard';
import { RefreshTokenGuard } from './auth/guard/refresh-token.guard';

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
	// === @UseGuards(AuthGuard('local'))
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
	// === @UseGuards(AuthGuard('jwt'))
	@UseGuards(AccessTokenGuard)
	@Get('profile')
	getProfile(@Request() req) {
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
