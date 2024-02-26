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

	/**
	 *
	 * @param data 유저 데이터
	 * @returns 생성된 유저 데이터 (비밀번호와, 토큰을 제외한 데이터)
	 */
	async create(data: Partial<User>): Promise<CreatedUser> {
		const savedUser = await this.userRepository.save({
			...data,
			createdDt: new Date(),
			updatedDt: new Date(),
		});
		const { password, accessToken, refreshToken, ...result } = savedUser;
		return result;
	}
	/**
	 *
	 * @param id 유저 아이디
	 * @returns 유저정보
	 */
	async findOneBy(id: number): Promise<User> {
		return await this.userRepository.findOneBy({ id });
	}
	/**
	 *
	 * @param column 데이터 속성
	 * @param value 데이터 값
	 * @returns 하나의 유저 데이터
	 */
	async findOne(column: keyof User, value: string): Promise<User> {
		const where = {};
		where[column] = value;
		return await this.userRepository.findOne({ where });
	}

	/**
	 *
	 * @returns 모든 유저 데이터
	 */
	async findAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	/**
	 *
	 * @param id 유저 아이디
	 * @param data 변경할 데이터
	 * @returns 변경된 데이터
	 */
	async update(id: number, data: Partial<User>): Promise<UpdateResult> {
		return await this.userRepository.update(id, {
			...data,
			updatedDt: new Date(),
		});
	}
}
