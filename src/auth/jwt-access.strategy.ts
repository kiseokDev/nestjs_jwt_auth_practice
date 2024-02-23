import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.access_secret,
		});
	}

	async validate(payload: any) {
		// The validate() method is called whenever a user is authenticated.
		// It should return the authenticated user's data from the payload (jwt payload)
		return { id: payload.sub, username: payload.username };
	}
}
