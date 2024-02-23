import {
	Controller,
	Get,
	Inject,
	Post,
	Req,
	Request,
	UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

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
	// @UseGuards(AuthGuard('local'))
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(AuthGuard('access'))
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(AuthGuard('refresh'))
	@Post('auth/refresh')
	restoreAccessToken(@Request() req) {
		return this.authService.generateAccessToken(req.user);
	}
}

type User = {
	username: string;
	password: string;
	id: number;
};
