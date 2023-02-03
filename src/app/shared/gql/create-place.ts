import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Place } from '../models/place';

export interface Response {
    createPlace: Place;
}

@Injectable({
    providedIn: 'root',
})
export class CreatePlaceGQL {
    document = gql`
        mutation createPlace($place: PlaceInput!, $files: [FileUpload!]) {
            createPlace(place: $place, files: $files) {
                id
                googlePlaceId
                name
                type
                address {
                    street
                    zipCode
                    city
                    country
                    location
                    icon
                }
                phoneNumber
                website
                status
                pictures {
                    publicId
                    url
                }
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    mutate(place: Place, filesToUpload: File[]) {
        return this.apollo
            .mutate<Response>({
                mutation: this.document,
                variables: {
                    place: {
                        placeId: place.id,
                        googlePlaceId: place.googlePlaceId,
                        businessName: place.name,
                        status: place.status,
                        address: {
                            street: place.address.street,
                            zipCode: place.address.zipCode,
                            city: place.address.city,
                            country: place.address.country,
                            location: place.address.location,
                            icon: place.address.icon,
                        },
                        phoneNumber: place.phoneNumber,
                        website: place.website,
                        pictures: place.pictures,
                    },
                    files: filesToUpload,
                },
                context: { useMultipart: true },
            })
            .pipe(map(({ data }) => data.createPlace));
    }
}
