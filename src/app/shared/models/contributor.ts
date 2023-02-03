import { User } from './user';
import { Place } from './place';

export class Contributor extends User {
    places: Place[];
}
