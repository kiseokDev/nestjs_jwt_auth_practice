import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator';
import { jwtConstants } from '../../constants';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from 'src/auth/decorator/roles.decorator';
import { SESSION_ROLE_KEY } from 'src/auth/decorator/session-roles.decorator';
import { get } from 'http';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtSessionRoleGuard extends AuthGuard('jwt-session') {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.getRequiredRolesMetadata(context);
		const token = this.authService.getTokenFromHeader(context);
		const userRole = await this.authService.getUserRolesById(token.sub);
		return requiredRoles.includes(userRole);
	}

	getRequiredRolesMetadata(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<string[]>(SESSION_ROLE_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
	}
}
