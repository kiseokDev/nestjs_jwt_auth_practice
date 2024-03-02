import { PartialType } from '@nestjs/mapped-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column()
	createdDt?: Date = new Date();

	@Column()
	updatedDt?: Date = new Date();

	@Column({ nullable: true })
	accessToken?: string | null;

	@Column({ nullable: true })
	refreshToken?: string | null;

	@Column({ nullable: true })
	roles?: string | null;
}

export class CreatedUser extends PartialType(User) {}
