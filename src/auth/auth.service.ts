import { Injectable, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne('username', username);
		if (user && user.password === pass) {
			const { password, accessToken, refreshToken, ...result } = user;
			return result;
		}
		return null;
	}
	async validateRefreshToken(refreshToken: string) {
		const user = await this.usersService.findOne(
			'refreshToken',
			refreshToken,
		);
		if (user && user.refreshToken === refreshToken) {
			return user;
		}
		return null;
	}

	async login(user: Pick<User, 'username' | 'id'>) {
		const payload = { username: user.username, sub: user.id };
		const accessToken = this.generateAccessToken(payload);
		const refreshToken = this.generateRefreshToken(payload);

		this.usersService.update(user.id, {
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
		const payload = { username: user.username, sub: user.id };
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
}
