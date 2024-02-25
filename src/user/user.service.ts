import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatedUser, User } from './entities/user.entity';

// This should be a real class/interface representing a user entity

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async findOne(column: keyof User, value: string): Promise<User> {
		const where = {};
		where[column] = value;
		return await this.userRepository.findOne({ where });
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async update(id: number, data: Partial<User>): Promise<UpdateResult> {
		return await this.userRepository.update(id, {
			...data,
			updatedDt: new Date(),
		});
	}

	async create(data: Partial<User>): Promise<CreatedUser> {
		const savedUser = await this.userRepository.save({
			...data,
			createdDt: new Date(),
			updatedDt: new Date(),
		});
		const { password, accessToken, refreshToken, ...result } = savedUser;
		return result;
	}
	async findByOne(id: number): Promise<User> {
		return await this.userRepository.findOneBy({ id });
	}
}
