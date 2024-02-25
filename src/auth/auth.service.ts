import { ExecutionContext, Injectable, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.findOne('username', username);
		if (user && user.password === pass) {
			const { password, accessToken, refreshToken, ...result } = user;
			return result;
		}
		return null;
	}
	async validateRefreshToken(refreshToken: string) {
		const user = await this.userService.findOne(
			'refreshToken',
			refreshToken,
		);
		if (user && user.refreshToken === refreshToken) {
			return user;
		}
		return null;
	}

	async login(user: Pick<User, 'username' | 'id'>) {
		const payload = { username: user.username, id: user.id };
		const accessToken = this.generateAccessToken(payload);
		const refreshToken = this.generateRefreshToken(payload);

		this.userService.update(user.id, {
			accessToken,
			refreshToken,
			createdDt: new Date(),
		});
		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}

	generateAccessToken(user: any) {
		const payload = { username: user.username, id: user.id };
		return this.jwtService.sign(payload, {
			secret: jwtConstants.access_secret,
			expiresIn: '30s',
		});
	}

	generateRefreshToken(payload: any) {
		const refresh = this.jwtService.sign(payload, {
			secret: jwtConstants.refresh_secret,
			expiresIn: '30s',
		});
		return refresh;
	}

	getTokenFromHeader(context: ExecutionContext) {
		//TODO TOKEN 타입 정의해야할듯
		return context
			.switchToHttp()
			.getRequest()
			.headers.authorization.split(' ')[1];
	}

	async getUserRolesById(id: string) {
		const user = await this.userService.findByOne(Number(id));
		return user.roles;
	}
}
