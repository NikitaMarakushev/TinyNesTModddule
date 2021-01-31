import { UserDto } from "../DTO/UserDto";
import { UserInterface } from "../entity/UserInterface";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";

export class UserService<ID> {
    constructor(
        private readonly userRepository: UserRepositoryInterface<ID>
    ){}

    public async create(dto: UserDto): Promise<UserInterface<ID>> {
        const user: UserInterface<ID> = {
            login: dto.login,
            password: dto.password
        };
        await this.userRepository.save(user);
        return user;
    }
}