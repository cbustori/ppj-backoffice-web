import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private securityService: SecurityService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.securityService.getLoggedUser();
        if (currentUser) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}
