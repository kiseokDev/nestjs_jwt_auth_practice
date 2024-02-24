import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class JwtGlobalGuard extends AuthGuard('jwt') {
	constructor(
		private reflector: Reflector,
		private jwtService: JwtService,
	) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		// Exclude auth/login route from the global guard

		const isPublic = this.isPublic(context);
		if (isPublic) {
			return true;
		}

		const requiredRoles = this.getRequiredRoles(context);

		//TODO: 유저의 권한을 가져오는 로직을 작성해야함
		const token = this.jwtService.decode(
			context
				.switchToHttp()
				.getRequest()
				.headers.authorization.split(' ')[1],
		);

		const userId = token['sub'];
		Logger.debug('token', token);
		Logger.debug('userId', userId);
		const userRoles = this.getUserRoles(userId); // db에서 유저의 권한을 가져옴
		const hasRole = this.hasRole(requiredRoles, userRoles);
		//TODO: 로거 삭제
		hasRole ? Logger.log('has role') : Logger.log('no role');
		if (!hasRole) {
			return false;
		}
		return super.canActivate(context);
	}

	getUserRoles(userId: string) {
		return ['user', 'admin'];
	}

	isPublic(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
	}
	getRequiredRoles(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
	}
	hasRole(requiredRoles: string[], userRoles: string[]) {
		return requiredRoles.every((role) => userRoles.includes(role));
	}
}
