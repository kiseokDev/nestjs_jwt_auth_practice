import { SetMetadata } from '@nestjs/common';

export enum SessionRoleEnum {
	Admin = 'admin',
	Head = 'head',
	Staff = 'staff',
}
export const SESSION_ROLE_KEY = 'session-role';
export const SessionRole = (...roles: SessionRoleEnum[]) =>
	SetMetadata(SESSION_ROLE_KEY, roles);
