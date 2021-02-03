import { UserService } from './UserService';
import { UserRepositoryInterface } from '../repository/UserRepositoryInterface';
import { UserInterface } from '../entity/UserInterface';
import { UserDto } from '../DTO/UserDto';
import { FindUserOptionsInterface } from '../options/FindUserOptionsInterface';
import { UserLoginAlreadyUsedException } from '../exception/UserLoginAlreadyUsedException';

describe('User Service', () => {
  let userService: UserService<string>;
  let userRepositoryMock: UserRepositoryInterface<string>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn() as (user: UserInterface<string>) => Promise<void>,
      update: jest.fn() as (user: UserInterface<string>) => Promise<void>,
    } as UserRepositoryInterface<string>;
    userService = new UserService<string>(userRepositoryMock);
  });

  describe('create', () => {
    it('should be return user with correct login and password', async () => {
      const dto: UserDto = { password: '1234', login: 'test.com' };
      userRepositoryMock.findByLogin = jest
        .fn()
        .mockImplementation(() => false);

      const user: UserInterface<string> = await userService.create(dto);

      expect(userRepositoryMock.save).toBeCalledTimes(1);
      expect(userRepositoryMock.findByLogin).toBeCalledTimes(1);
      expect(user.login).toBe(dto.login);
      expect(user.password).toBe(dto.password);
    });
    it('should be throw user login aready used exception', async () => {
      const dto: UserDto = { password: '1234', login: 'test.com' };
      userRepositoryMock.findByLogin = jest.fn().mockImplementation(() => true);

      try {
        const user: UserInterface<string> = await userService.create(dto);
      } catch (e) {
        expect(userRepositoryMock.save).toBeCalledTimes(0);
        expect(userRepositoryMock.findByLogin).toBeCalledTimes(1);
        expect(e).toBeInstanceOf(UserLoginAlreadyUsedException);
      }
    });
  });
  describe('edit', () => {
    it('should be return updated user with new login and password', async () => {
      userRepositoryMock.getById = jest.fn().mockImplementation(() => ({
        id: 'test',
        login: 'abc',
        password: '1233',
      })) as never;

      const dto: UserDto = { password: 'same', login: 'question' };
      const user: UserInterface<string> = await userService.edit('test', dto);

      expect(userRepositoryMock.getById).toBeCalledTimes(1);
      expect(userRepositoryMock.update).toBeCalledTimes(1);
      expect(user).toBeDefined();
      expect(user.id).toBe('test');
      expect(user.password).toBe(dto.password);
      expect(user.login).toBe(dto.login);
    });
  });
  describe('findBy', () => {
    it('should be return users', async () => {
      const dataUsers = [
        {
          id: 'test',
          login: 'abc',
          password: '1233',
        },
        {
          id: 'test1',
          login: 'abc',
          password: '1233',
        },
      ];

      userRepositoryMock.findBy = jest
        .fn()
        .mockImplementation(() => dataUsers) as (
        options: FindUserOptionsInterface,
      ) => Promise<UserInterface<string>[]>;
      const users: UserInterface<string>[] = await userService.findBy({});

      expect(userRepositoryMock.findBy).toBeCalledTimes(1);
      expect(users).toEqual(dataUsers);
    });
  });
  describe('getById', () => {
    it('should be return user by id', async () => {
      const dataUser = {
        login: '123',
        password: '123',
        id: '1',
      } as UserInterface<string>;
      userRepositoryMock.getById = jest
        .fn()
        .mockImplementation(() => dataUser) as never;
      const user: UserInterface<string> = await userService.getById('1');

      expect(userRepositoryMock.getById).toBeCalledTimes(1);
      expect(user).toEqual(dataUser);
    });
  });
  describe('remove', () => {
    it('should be get user by id and pass to remove it', async () => {
      const dataUser = {
        login: '123',
        password: '123',
        id: '1',
      } as UserInterface<string>;
      userRepositoryMock.getById = jest
        .fn()
        .mockImplementation(() => dataUser) as never;
      userRepositoryMock.remove = jest
        .fn()
        .mockImplementation((user: UserInterface<string>) => {
          expect(user).toEqual(dataUser);
        }) as never;
      await userService.remove('1');

      expect(userRepositoryMock.getById).toBeCalledTimes(1);
      expect(userRepositoryMock.remove).toBeCalledTimes(1);
    });
  });
});
