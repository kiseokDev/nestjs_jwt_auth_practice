import {
	Controller,
	Get,
	Inject,
	Post,
	Req,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseConnection } from './databaseConnetion';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		@Inject('CONNECTION') private db: DatabaseConnection,
	) {}

	@Get()
	getHello(): string {
		this.db.logger();
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
	restoreAccessToken(@Req() req: Request & AuthUser) {
		return this.authService.getAccessToken({ user: req.user });
	}
}

type User = {
	username: string;
	password: string;
	userId: number;
};

interface AuthUser {
	user: Pick<User, 'username' | 'userId'>;
}
