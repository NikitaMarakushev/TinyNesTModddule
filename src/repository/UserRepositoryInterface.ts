import { FindUserOptionsInterface } from "src/options/FindUserOptionsInterface";
import { UserInterface } from "../entity/UserInterface";

export interface UserRepositoryInterface<ID> {
    save(user: UserInterface<ID>): Promise<void>;
    update(user: UserInterface<ID>): Promise<void>;
    getById<T = UserInterface<ID>>(id: ID): Promise<T>;
    remove(user: UserInterface<ID>): Promise<void>;
    findBy(oprions: FindUserOptionsInterface): Promise<UserInterface<ID>[]>;
    findByLogin<T = UserInterface<ID>>(login: string): Promise<T|undefined>;
}