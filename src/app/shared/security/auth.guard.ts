import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';

import { UserStatus } from './../models/user';
import { UserGQL } from '../gql/user-gql';
import { SecurityService } from './security.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private securityService: SecurityService,
        private userGQL: UserGQL
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.securityService.getLoggedUser();
        if (!currentUser) {
            this.router.navigate(['login']);
            return false;
        }
        return this.userGQL.watch().valueChanges.pipe(
            map((result) => {
                const userStatut = UserStatus.formKey(
                    result.data.me.userStatus
                );
                if (
                    userStatut &&
                    userStatut.key !== UserStatus.USER_CONFIRMED.key
                ) {
                    this.router.navigate(['user/validation']);
                    return false;
                }
                return true;
            })
        );
    }
}
