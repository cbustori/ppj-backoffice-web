import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { Event } from '../models/event';

export interface Response {
    createEvents: Event[];
}

@Injectable({
    providedIn: 'root',
})
export class CreateEventsGQL extends Mutation<Response> {
    document = gql`
        mutation createEvents($events: [EventInput!]!) {
            createEvents(events: $events) {
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
