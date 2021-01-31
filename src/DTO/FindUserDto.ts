import { UserInterface } from '../entity/UserInterface';
import { FindUserOptionsInterface } from "src/options/FindUserOptionsInterface";

export class FindUserDto implements FindUserOptionsInterface {
    offset?: number;
    limit?: number; 
    order?: Record<keyof UserInterface<never>, "ASC" | "DESC">
}