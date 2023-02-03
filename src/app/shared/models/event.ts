import { Place } from './place';
import { Picture } from './picture';

export enum EventType {
    DISH_OF_THE_DAY = 'Plat du jour',
    BREAKFAST_OF_THE_DAY = 'Petit-déjeuner',
    COCKTAIL_OF_THE_DAY = 'Cocktail du jour',
    GOUTER_OF_THE_DAY = 'Goûter du jour',
    HAPPY_HOUR = 'Happy Hour'
}

export abstract class Event {
    id: string;
    title: string;
    description: string;
    availableOn: Date;
    type: string;
    tags: string[];
    place: Place;
    price: number;
    pictures: Picture[];
}
