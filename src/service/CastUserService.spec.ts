import { UserSerivceInterface } from './UserServiceInterface';
import { CastUserService } from './CastUserService';

describe('CastUserService', () => {
  class Test {}

  let origin: UserSerivceInterface<string>;
  let castUserService: CastUserService<string>;

  beforeEach(() => {
    origin = {
      create: jest.fn().mockImplementation(() => {
        return { login: '123' };
      }),
      edit: jest.fn().mockImplementation(() => {
        return { login: '123' };
      }),
      getById: jest.fn().mockImplementation(() => {
        return { login: '123' };
      }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove: jest.fn().mockImplementation(() => {}),
      findBy: jest.fn().mockImplementation(() => {
        return [{ login: '123' }, { login: '123' }];
      }),
    };
    castUserService = new CastUserService<string>(origin, Test);
  });

  describe('create', () => {
    it('should be create user by origin and cast to specified type', async () => {
      const user = await castUserService.create({} as never);
      expect(user).toBeInstanceOf(Test);
      expect(origin.create).toBeCalledTimes(1);
    });
  });

  describe('edit', () => {
    it('should be edit user by origin and cast to specified type', async () => {
      const user = await castUserService.edit('1', {} as never);
      expect(user).toBeInstanceOf(Test);
      expect(origin.edit).toBeCalledTimes(1);
    });
  });
  describe('findBy', () => {
    it('should be find users and cast to specific type', async () => {
      const users = await castUserService.findBy({} as never);
      expect(origin.findBy).toBeCalledTimes(1);
      for (const user of users) {
        expect(user).toBeInstanceOf(Test);
      }
    });
  });
  describe('getById', () => {
    it('should be get user by id and cast to specific type', async () => {
      const user = await castUserService.getById({} as never);
      expect(origin.getById).toBeCalledTimes(1);
      expect(user).toBeInstanceOf(Test);
    });
  });
});
