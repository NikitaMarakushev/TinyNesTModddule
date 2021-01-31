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
});