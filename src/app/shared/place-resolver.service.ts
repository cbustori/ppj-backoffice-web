import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from './user-service';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class PlaceResolverService implements Resolve<User> {
    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): User | Observable<any> {
        const user = this.userService.getCurrentUser();
        if (!user) {
            return this.userService.fetchUser();
        }
        return this.userService.getCurrentUser();
    }
}
