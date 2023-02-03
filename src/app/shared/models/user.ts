import { Address } from './address';
import { Picture } from './picture';
import { Contributor } from './contributor';
import { ManagedPlace } from './place';

export class UserToken {
    constructor(
        public id: string,
        public accessToken: string) { }
}

export class UserStatus {
    static readonly EMAIL_TO_BE_CONFIRMED = new UserStatus('EMAIL_TO_BE_CONFIRMED', 'En attente de validation de l\'email.');
    static readonly RESTAURANT_TO_BE_CONFIRMED = new UserStatus('RESTAURANT_TO_BE_CONFIRMED',
        'En attente de validation de l\'établissement.');
    static readonly WAITING_FOR_VALIDATION = new UserStatus('WAITING_FOR_VALIDATION', 'En attente de validation');
    static readonly USER_CONFIRMED = new UserStatus('USER_CONFIRMED', 'Confirmé');

    private constructor(public readonly key: string, public readonly value: any) { }

    public static formKey(key: string) {
        if (UserStatus.EMAIL_TO_BE_CONFIRMED.key === key) {
            return UserStatus.EMAIL_TO_BE_CONFIRMED;
        } else if (UserStatus.RESTAURANT_TO_BE_CONFIRMED.key === key) {
            return UserStatus.RESTAURANT_TO_BE_CONFIRMED;
        } else if (UserStatus.USER_CONFIRMED.key === key) {
            return UserStatus.USER_CONFIRMED;
        }
    }

    toString() {
        return this.key;
    }
}

export enum UserType {
    MANAGER,
    CONTRIBUTOR
}

export class User {
    id: string;
    firstName: string;
    userStatus: string;
    name: string;
    email: string;
    adresse: Address;
    phoneNumber: string;
    profilePicture: Picture;
    contributors: Contributor[];
    managedPlaces: ManagedPlace[];
}
