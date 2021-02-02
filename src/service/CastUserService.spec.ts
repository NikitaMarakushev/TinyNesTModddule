import {UserSerivceInterface} from "./UserServiceInterface";
import {CastUserService} from "./CastUserService";
import {UserDto} from "../DTO/UserDto";
import {UserInterface} from "../entity/UserInterface";
import {FindUserDto} from "../DTO/FindUserDto";


describe("cast user service ", () => {
    class Test{}
    let origin: UserSerivceInterface<string>;
    let castUserService: CastUserService<string>;

    beforeEach( () => {
        origin = {
            create: jest.fn().mockImplementation( () => {
                return {login: '123'};
            }),
            edit: jest.fn().mockImplementation( () => {
                return {login: '123'};
            }),
            getById: jest.fn().mockImplementation( () => {
                return {login: '123'};
            }),
            remove: jest.fn().mockImplementation( () => {}),
            findBy: jest.fn().mockImplementation( () => {
                return [
                    {login: '123'}
                    ];
            })
        };
        castUserService = new CastUserService<string>(origin, Test);
    });

    describe("create", () => {
        it("should create user by origin and cast to specified type", async () => {


            const user = await castUserService.create({} as never);
            expect(user).toBeInstanceOf(Test);
            expect(origin.create).toBeCalledTimes(1);
        });
    });

    describe("edit", () => {
        it("should edit user by origin and cast to specified type", async () => {
            const user = await castUserService.edit('1', {} as never);
            expect(user).toBeInstanceOf(Test);
            expect(origin.edit).toBeCalledTimes(1);
        });
    });

    describe("findBy", () => {
        it("should find users by origin and cast to specified type", async () => {
            const users = await castUserService.findBy({} as never);
            expect(origin.findBy).toBeCalledTimes(1);
            for (const user of users) {
                expect(user).toBeInstanceOf(Test);
            }
        });
    });

    describe("getById", () => {
        it("should get user by origin and cast to specified type", async () => {
            const user = await castUserService.getById({} as never);
            expect(origin.findBy).toBeCalledTimes(1);
            expect(user).toBeInstanceOf(Test);
        });
    });
});