import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	/** 3 */
	async validate(email: string, pw: string): Promise<any> {
		return { email, pw };
	}
}
