import { Event, EventType } from './event';
import { EnumUtil } from '../enum-util';

export class Dish extends Event {
    price: number;

    constructor() {
        super();
        this.type = 'DISH_OF_THE_DAY';
        this.availableOn = new Date();
    }

}
