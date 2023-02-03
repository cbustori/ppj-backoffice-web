import { Address } from './address';
import { Picture } from './picture';
import { UserType } from './user';

/* export class PlaceStatus {
    static readonly PENDING = new PlaceStatus('PENDING', 'En attente de validation');
    static readonly CONFIRMED = new PlaceStatus('CONFIRMED', 'Confirmé');
    static readonly REFUSED = new PlaceStatus('REFUSED', 'Refusé');

    private constructor(public readonly key: string, public readonly value: any) {}

    toString() {
        return this.key;
    }
} */

export enum PlaceStatus {
    PENDING = 'En attente de validation',
    CONFIRMED = 'Confirmé',
    REFUSED = 'Refusé',
}

export enum PlaceType {
    RESTAURANT = 'Restaurant',
    HOTEL = 'Hôtel',
    CAFE = 'Café',
    BAR = 'Bar/Pub',
}

export class ManagedPlace {
    place: Place;
    role: UserType;
}

export abstract class Place {
    id: string;
    googlePlaceId: string;
    name: string;
    address: Address;
    phoneNumber: string;
    type: PlaceType;
    tags: string[];
    pictures: Picture[];
    website: string;
    status: PlaceStatus;
}
