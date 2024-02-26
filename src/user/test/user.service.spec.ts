import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
	let userService: UserService;
	let userRepository: any;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: jest.fn(),
						findOneBy: jest.fn(),
						save: jest.fn(),
					},
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get(getRepositoryToken(User));
	});

	describe('findOneBy', () => {
		it('유저를 찾으면 유저정보를 반환한다', async () => {
			const userId = 1;
			const expectedUser = { id: userId, name: 'Test User' };

			userRepository.findOneBy.mockResolvedValue(expectedUser);
			const user = await userService.findOneBy(userId);
			expect(user).toEqual(expectedUser);
		});

		it('유저가 없으면 널을 반환한다.', async () => {
			const userId = 1;
			userRepository.findOneBy.mockResolvedValue(null);
			const user = await userService.findOneBy(userId);
			expect(user).toBeNull();
		});
	});

	describe('create', () => {
		it('should create a new user', async () => {
			const userData = { username: 'New User' };
			const createdUser = { id: 1, ...userData };

			userRepository.save.mockResolvedValue(createdUser);
			const result = await userService.create(userData);
			expect(result).toEqual({ id: 1, username: 'New User' });
		});
	});
});
