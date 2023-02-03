import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Event } from '../models/event';

export interface Response {
    events: Event[];
}

@Injectable({
    providedIn: 'root',
})
export class EventsByPlaceGQL extends Query<Response> {
    document = gql`
        query eventsByPlace($placeId: ID!, $start: Int!, $limit: Int!) {
            eventsByPlace(placeId: $placeId, start: $start, limit: $limit) {
                id
                title
                description
                availableOn
                type
                tags
                pictures {
                    publicId
                    url
                }
                place {
                    id
                    name
                }
                ... on Dish {
                    price
                }
            }
        }
    `;
}
