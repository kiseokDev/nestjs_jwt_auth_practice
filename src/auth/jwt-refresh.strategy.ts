import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

export class JwtRefreshStretegy extends PassportStrategy(Strategy, 'refresh') {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: (req) => {
				const cookie = this.getCookie(req);
				return cookie;
			},
			ignoreExpiration: false,
			secretOrKey: jwtConstants.refresh_secret,
		});
	}

	validate(payload: any) {
		//TODO: 인증 통과 못하면? 탈취당한 토큰이라고 판단하고 로그아웃 처리를 해야함
		// const user = this.authService.validateRefreshToken(payload);
		// if (!user) {
		// 	throw new UnauthorizedException();
		// }
		// return user;

		//슬라이싱 세션 토큰을 통해 유저 정보를 가져옴
		return { username: payload.username, sub: payload.sub };
	}

	getCookie(req) {
		return req.headers.cookie.split('=')[1];
	}
}
