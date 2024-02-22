import { PartialType } from '@nestjs/mapped-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreateUserDto {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	createdDt: Date = new Date();
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
	// @Column()
}
