import { Injectable } from '@angular/core';

import { Place } from './models/place';

@Injectable({ providedIn: 'root' })
export class PlaceService {
    places: Place[] = [];

    getPlaces(): Place[] {
        return this.places.slice();
    }

    getPlaceById(id: string): Place {
        return this.places.find((e) => e.id === id);
    }

    pushPlace(place: Place) {
        const p = this.getPlaceById(place.id);
        if (!p) {
            this.places.push(place);
        } else {
            const index = this.places.indexOf(p);
            this.places[index] = place;
        }
    }
}
