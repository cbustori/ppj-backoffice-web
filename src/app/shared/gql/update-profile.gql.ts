import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { User } from '../models/user';

export interface Response {
    updateProfile: User;
}

@Injectable({
    providedIn: 'root',
})
export class UpdateProfileGQL {
    document = gql`
        mutation updateProfile($user: UserInput!, $profilePicture: FileUpload) {
            updateProfile(user: $user, profilePicture: $profilePicture) {
                id
                firstName
                name
                email
                phoneNumber
                profilePicture {
                    publicId
                    url
                }
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    mutate(user: User, password: string, profilePic: File) {
        console.log(profilePic);
        return this.apollo
            .mutate<Response>({
                mutation: this.document,
                variables: {
                    user: {
                        email: user.email,
                        lastName: user.name,
                        firstName: user.firstName,
                        phoneNumber: user.phoneNumber,
                        password: password,
                    },
                    profilePicture: profilePic,
                },
                context: { useMultipart: true },
            })
            .pipe(map(({ data }) => data.updateProfile));
    }
}
