import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// canActivate 메소드를 오버라이드하여 토큰 만료 시 동작을 정의합니다.
		const request = context.switchToHttp().getRequest();
		try {
			await super.canActivate(context);
			return true;
		} catch (err) {
			// 토큰이 만료되었을 때의 처리
			Logger.warn(err);
			if (err.name === 'TokenExpiredError') {
				// 만료된 토큰 처리 로직
				const refreshToken = request.session.refreshToken; // 세션에서 리프레시 토큰 가져오기
				if (!refreshToken) {
					// 리프레시 토큰이 없는 경우
					// 클라이언트에게 로그인을 다시 요청하도록 응답합니다.
					return false;
				}
				// 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급 로직
				// 데이터베이스에서 리프레시 토큰을 확인하고, 유효한 경우 새로운 액세스 토큰을 발급합니다.
				// 발급된 액세스 토큰을 사용하여 사용자를 인증하고, 요청을 계속 진행합니다.
				// 이후에는 AuthGuard에서 토큰 유효성을 다시 검사하고, 정상적인 요청이 진행됩니다.
				return true;
			}
			throw err;
		}
	}
}
