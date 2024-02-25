import { UserService } from '../../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator';
import { ROLES_KEY } from '../../decorator/roles.decorator';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CheckRoleFromJwtGuard extends AuthGuard('jwt') {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		return this.isRequiredRolesAPI(context) ? true : false;
	}

	isRequiredRolesAPI(context: ExecutionContext) {
		const requiredRoles = this.getRequiredRolesMetaData(context);
		const token = this.authService.getTokenFromHeader(context);
		const userRolefromJwt = token.role;

		return requiredRoles.includes(userRolefromJwt);
	}

	getRequiredRolesMetaData(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
	}
}
