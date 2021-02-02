import { UserSerivceInterface } from "./UserServiceInterface";
import { UserDto } from "../DTO/UserDto";
import { UserInterface } from "../entity/UserInterface";
import { FindUserDto } from "../DTO/FindUserDto";

export class CastUserService<ID> implements UserSerivceInterface<ID> {

    constructor(
        private readonly origin: UserSerivceInterface<ID>,
        private readonly classType: new (...args: never[]) => never
    ) {}

    public async create(dto: UserDto): Promise<UserInterface<ID>> {
        return this.cast(await this.origin.create(dto));
    }

    public async edit(id: ID, dto: UserDto): Promise<UserInterface<ID>> {
        return this.cast(await this.origin.edit(id, dto));
    }

    public async findBy<T = UserInterface<ID>>(dto: FindUserDto): Promise<T[]> {
        const users = await this.origin.findBy(dto);
        return users.map(this.cast);
    }

    public async getById<T = UserInterface<ID>>(id: ID): Promise<T> {
        return this.cast(await this.origin.getById(id));
    }

    public async remove(id: ID): Promise<void> {
        await this.origin.remove(id);
    }

    private cast<T = UserInterface<ID>>(user: T): T{
        Reflect.setPrototypeOf(user, this.classType);
        return user;
    }
}