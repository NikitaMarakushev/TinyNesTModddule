import { FindUserOptionsInterface } from "src/options/FindUserOptionsInterface";
import { UserInterface } from "../entity/UserInterface";

export interface UserRepositoryInterface<ID> {
    save(user: UserInterface<ID>): Promise<void>;
    update(user: UserInterface<ID>): Promise<void>;
    getById(id: ID): Promise<UserInterface<ID>>;
    remove(user: UserInterface<ID>): Promise<void>;
    findBy(oprions: FindUserOptionsInterface): Promise<UserInterface<ID>[]>;
}