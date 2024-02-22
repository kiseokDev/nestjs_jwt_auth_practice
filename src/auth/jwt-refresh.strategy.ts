import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

export class JwtRefreshStretegy extends PassportStrategy(Strategy, 'refresh') {
	constructor() {
		super({
			jwtFromRequest: (req) => {
				const cookie = req.cookies['refreshToken'];
				return cookie;
			},
			ignoreExpiration: false,
			secretOrKey: jwtConstants.refresh_secret,
		});
	}
}
