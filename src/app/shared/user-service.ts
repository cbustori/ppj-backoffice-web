import { Injectable } from '@angular/core';
import { UserGQL } from './gql/user-gql';
import { User } from './models/user';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlaceService } from './place.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUser: User;

    constructor(private userGQL: UserGQL) {}

    fetchUser(): Observable<User> {
        return this.userGQL.fetch().pipe(
            map((response) => response.data.me),
            tap((user) => (this.currentUser = user))
        );
    }

    getCurrentUser(): User {
        return this.currentUser;
    }
}
