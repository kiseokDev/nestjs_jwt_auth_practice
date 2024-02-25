import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';

@Injectable()
export class GlobalAccessTokenGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.isPublicAPI(context)) {
			return true;
		}
		await super.canActivate(context);
		return true;
	}

	isPublicAPI(context: ExecutionContext) {
		return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
	}
}
