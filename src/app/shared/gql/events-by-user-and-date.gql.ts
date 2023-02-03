import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Event } from '../models/event';

export interface Response {
    eventsByUserAndDate: Event[];
}

@Injectable({
    providedIn: 'root',
})
export class EventsByUserAndDateGQL extends Query<Response> {
    document = gql`
        query eventsByUserAndDate($availableOn: Date!) {
            eventsByUserAndDate(availableOn: $availableOn) {
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
