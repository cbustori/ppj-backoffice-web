import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class DeleteEventGQL extends Mutation {
    document = gql`
        mutation deleteEvent($eventId: ID!) {
            deleteEvent(eventId: $eventId)
        }
    `;
}
