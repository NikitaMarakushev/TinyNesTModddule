import { UserInterface } from '../entity/UserInterface';
import { FindUserDto } from '../DTO/FindUserDto';
import { UserDto } from '../DTO/UserDto';

 export interface UserSerivceInterface<ID> {
    getById<T = UserInterface<ID>>(id: ID): Promise<T>;
    create(dto: UserDto): Promise<UserInterface<ID>>;
    edit(id: ID, dto: UserDto): Promise<UserInterface<ID>>;
    findBy(dto: FindUserDto): Promise<UserInterface<ID>[]>;
    remove(id: ID): Promise<void>;
}
