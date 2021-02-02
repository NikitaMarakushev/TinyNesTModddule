import { UserInterface } from '../entity/UserInterface';
import { FindUserDto } from '../DTO/FindUserDto';
import { UserDto } from '../DTO/UserDto';

 export interface UserSerivceInterface<ID> {
    getById<T = UserInterface<ID>>(id: ID): Promise<T>;
    findBy<T = UserInterface<ID>>(dto: FindUserDto): Promise<[]>;
    create(dto: UserDto): Promise<UserInterface<ID>>;
    edit(id: ID, dto: UserDto): Promise<UserInterface<ID>>;
    remove(id: ID): Promise<void>;
}
