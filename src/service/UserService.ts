import { FindUserDto } from "src/DTO/FindUserDto";
import { UserDto } from "../DTO/UserDto";
import { UserInterface } from "../entity/UserInterface";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";
import { UserSerivceInterface } from "./UserServiceInterface";
import {UserLoginAlreadyUsedException} from "../exception/UserLoginAlreadyUsedException";

export class UserService<ID> implements UserSerivceInterface<ID> {

    constructor(
        private readonly userRepository: UserRepositoryInterface<ID>
    ){}

    public async getById<T = UserInterface<ID>>(id: ID): Promise<T>
    {
        return this.userRepository.getById<T>(id);
    }

    public async create(dto: UserDto): Promise<UserInterface<ID>> {
        const found = await this.userRepository.findByLogin(dto.login);
        
        if (found) {
            throw new UserLoginAlreadyUsedException();
        }
        
        const user: UserInterface<ID> = {
            login: dto.login,
            password: dto.password
        };
        await this.userRepository.save(user);
        return user;
    }

    public async edit(id: ID, dto: UserDto): Promise<UserInterface<ID>>
    {
        const user = await this.userRepository.getById(id);
        user.login = dto.login;
        user.password = dto.password;
        await this.userRepository.update(user);
        return user;
    }

    public async findBy(dto: FindUserDto): Promise<UserInterface<ID>[]>
    {
        return this.userRepository.findBy(dto);
    }

    public async remove(id: ID): Promise<void>
    {   
        const user = await this.userRepository.getById(id);
        await this.userRepository.remove(user);
    }
}