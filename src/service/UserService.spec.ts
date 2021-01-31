import { UserRepositoryInterface } from '../repository/UserRepositoryInterface';
import { UserService } from "./UserService";
import { UserDto } from 'src/DTO/UserDto';
import { UserInterface } from 'src/entity/UserInterface';

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
            const user: UserInterface<string> = await userService.create(dto);

            expect(userRepositoryMock.save).toBeCalledTimes(1);
            expect(user.login).toBe(dto.login);
            expect(user.password).toBe(dto.password);
        });
    });

    describe("edit", () => {
        it("should be return updated user with new login and password", async () => {
            userRepositoryMock.getById = jest.fn().mockImplementation( () => ({
                id: "test",
                login: "abc",
                password: "1234"
            })) as (id: string) => Promise<UserInterface<string>>;
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
});