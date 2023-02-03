import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Event } from '../models/event';

export interface Response {
    createEvent: Event;
}

@Injectable({
    providedIn: 'root',
})
export class CreateEventGQL {
    document = gql`
        mutation createEvent($event: EventInput!, $files: [FileUpload!]) {
            createEvent(event: $event, files: $files) {
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

    constructor(private apollo: Apollo) {}

    mutate(event: Event, filesToUpload: File[]) {
        return this.apollo
            .mutate<Response>({
                mutation: this.document,
                variables: {
                    event: {
                        eventId: event.id,
                        type:  event.type,
                        place: event.place.id,
                        title: event.title,
                        description: event.description,
                        availableOn: event.availableOn,
                        tags: event.tags,
                        pictures: event.pictures,
                        price: event.price,
                    },
                    files: filesToUpload,
                },
                context: { useMultipart: true },
            })
            .pipe(map(({ data }) => data.createEvent));
    }
}
