import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface Response {
    me: User;
}

@Injectable({
    providedIn: 'root',
})
export class UserGQL extends Query<Response> {
    document = gql`
        query {
            me {
                id
                firstName
                userStatus
                name
                email
                phoneNumber
                profilePicture {
                    publicId
                    url
                }
                managedPlaces {
                    role
                    place {
                        id
                        name
                        address {
                            street
                            zipCode
                            city
                            country
                        }
                        phoneNumber
                        website
                        status
                    }
                }
            }
        }
    `;
}
