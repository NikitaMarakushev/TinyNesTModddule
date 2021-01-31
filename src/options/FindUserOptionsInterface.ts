import { UserInterface } from '../entity/UserInterface'
import { LimitInterface } from './LimitInterface';
import { OffsetInterface } from './OffsetInterface';
import { OrderInterface } from '../options/OrderInterface';

export interface FindUserOptionsInterface extends LimitInterface, OffsetInterface, OrderInterface<keyof UserInterface<unknown> {
    
} 