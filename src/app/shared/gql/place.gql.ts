import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Place } from '../models/place';

export interface Response {
    place: Place;
}

@Injectable({
    providedIn: 'root',
})
export class PlaceGQL extends Query<Response> {
    document = gql`
        query place($placeId: ID!) {
            place(id: $placeId) {
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
}
