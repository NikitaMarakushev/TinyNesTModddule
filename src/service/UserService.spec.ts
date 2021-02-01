import { UserRepositoryInterface } from '../repository/UserRepositoryInterface';
import { UserService } from "./UserService";
import { UserDto } from 'src/DTO/UserDto';
import { UserInterface } from 'src/entity/UserInterface';
import { FindUserOptionsInterface } from 'src/options/FindUserOptionsInterface';
import { UserLoginAlreadyUsedException } from 'src/exception/UserLoginAlreadyUsedException';

describe("User Service", () => {

    let userService: UserService<string>;
    let userRepositoryMock: UserRepositoryInterface<string>;

    beforeEach(() => {  
        userRepositoryMock = {
            save: jest.fn() as (user: UserInterface<string>) => Promise<void>,
            update: jest.fn() as (user: UserInterface<string>) => Promise<void>,
        } as UserRepositoryInterface<string>;
        userService = new UserService<string>(userRepositoryMock);
    });


    describe("create", () => {
        it("That should return user with correct enty data(login, password)", async () => {
            const dto: UserDto = {password: '1234', login: 'test.com'};
            userRepositoryMock.findByLogin = jest.fn().mockImplementation( () => false );

            const user: UserInterface<string> = await userService.create(dto);
            
            expect(userRepositoryMock.save).toBeCalledTimes(1);
            expect(userRepositoryMock.findByLogin).toBeCalledTimes(1);
            expect(user.login).toBe(dto.login);
            expect(user.password).toBe(dto.password);
        });
        it("should throw user login already used exception", async () => {
            const dto: UserDto = {password: '1234', login: 'test.com'};
            userRepositoryMock.findByLogin = jest.fn().mockImplementation( () => true);

            try {
                const user: UserInterface<string> = await userService.create(dto);
            } catch (e) {
                expect(userRepositoryMock.save).toBeCalledTimes(1);
                expect(userRepositoryMock.findByLogin).toBeCalledTimes(1);
                expect(e).toBeInstanceOf(UserLoginAlreadyUsedException);
            }

        });
    });

    describe("edit", () => {
        it("should be return updated user with new login and password", async () => {
            userRepositoryMock.getById = jest.fn().mockImplementation( () => ({
                id: "test",
                login: "abc",
                password: "1234"
            })) as never;
            
            const dto: UserDto = { password: 'some', login: 'question' };
            const user: UserInterface<string> = await userService.edit("test", dto);

            expect(userRepositoryMock.getById).toBeCalledTimes(1);
            expect(userRepositoryMock.update).toBeCalledTimes(1);
            expect(user).toBeDefined();
            expect(user.id).toBe("test");
            expect(user.password).toBe(dto.password);
            expect(user.login).toBe(dto.login);
        });
    });

    describe("findBy", () => {
        it("should retrurn users", async () => {
            //Hard code for testing
            const datausers = [
                {
                    id: 'test',
                    login: 'abc',
                    password: '12423'
                },
                {
                    id: 'test2',
                    login: 'abcd',
                    password: '124235'
                }
            ];
            userRepositoryMock.findBy = jest.fn().mockImplementation( () => (datausers)) as (oprions: FindUserOptionsInterface) => Promise<UserInterface<string>>;
            
            const users: UserInterface<string[]> = await userService.findBy({});

            expect(userRepositoryMock.findBy).toBeCalledTimes(1);
            expect(users).toEqual(datausers);
        });
    });

    describe("getById", () => {
        it("should retrurn user by id", async () => {
            const datauser =  {
                id: 'test',
                login: 'abc',
                password: '12423'
            } as UserInterface<string>;
            userRepositoryMock.getById = jest.fn().mockImplementation( () => (datauser)) as never;
            const user: UserInterface<string> = await userService.getById('1');

            expect(userRepositoryMock.getById).toBeCalledTimes(1);
            expect(user).toEqual(datauser);
        });
    });
});