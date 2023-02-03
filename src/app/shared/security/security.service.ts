import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import {  UserToken } from '../models/user';

export interface AuthResponse {
    accessToken: string;
}

export interface CheckEmailResponse {
    exist: boolean;
}

@Injectable({ providedIn: 'root' })
export class SecurityService {
    private user = new BehaviorSubject<UserToken>(this.hasValidUser());
    private tokenExpirationTimer: any;

    urlBase = 'https://dev.plaplajour.fr/auth/';
    //urlBase = 'http://localhost:9091/auth/';
    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponse>(
                this.urlBase + 'login',
                {
                    email,
                    password,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(data => {
                    this.handleAuthentication(data.accessToken, true);
                })
            );
    }

    register(name: string, firstName: string, email: string, password: string, phoneNumber: string, birthday: any) {
        return this.http
            .post<AuthResponse>(
                this.urlBase + 'signup',
                {
                    name,
                    firstName,
                    email,
                    password,
                    phoneNumber,
                    birthday,
                    type: 'MANAGER'
                },
            )
            .pipe(
                catchError(this.handleErrorRegister),
                tap(data => {
                    this.handleAuthentication(data.accessToken, false);
                })
            );
    }


    checkEmail(email: string) {
        return this.http
            .post<CheckEmailResponse>(
                this.urlBase + 'email',
                {
                    email
                }
            )
            .pipe(
                catchError(this.handleError)
            );
    }

    lostPassword(email: string) {
        return this.http
            .post(this.urlBase + 'lost', { email }, { responseType: 'text' })
            .pipe(
                catchError(this.handleErrorLostPassword)
            );
    }

    logout(redirect: boolean) {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

        if (redirect) {
            this.router.navigate(['login']);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout(true);
        }, expirationDuration);
    }

    private handleAuthentication(accessToken: string, redirect: boolean) {
        const jwtDecoded = jwt_decode(accessToken);
        const user = new UserToken(jwtDecoded.sub, accessToken);
        this.user.next(user);
        this.autoLogout(this.getTokenExpirationDate(jwtDecoded).getTime() - new Date().getTime());
        localStorage.setItem('userData', JSON.stringify(user));
        if (redirect) {
            this.router.navigate(['/home']);
        }
    }

    private hasValidUser() {
        const userData: {
            id: string;
            accessToken: string;
            expirationDate: number;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return null;
        }
        const loadedUser = new UserToken(
            userData.id,
            userData.accessToken
        );

        if (loadedUser.accessToken) {
            const jwtDecoded = jwt_decode(loadedUser.accessToken);
            this.autoLogout(this.getTokenExpirationDate(jwtDecoded).getTime() - new Date().getTime());
            return loadedUser;
        }
    }

    private handleError(error: HttpErrorResponse) {
        let errorMsg = 'Une erreur interne s\'est produite, merci de contacter le support';
        if (error.status === 401) {
            errorMsg = 'Identifiant ou mot de passe incorrect';
        } else if (error.status === 400) {
            errorMsg = 'Votre n\'est pas activé. ' +
                'Merci de regarder dans votre boite de réception et/ou votre boite spam pour trouver l\'email de confirmation. 👌';
        }
        return throwError(errorMsg);
    }

    private handleErrorLostPassword(error: HttpErrorResponse) {
        let errorMsg = 'Une erreur interne s\'est produite, merci de contacter le support';
        if (error.status === 404) {
            errorMsg = 'L\'email n\'existe pas.';
        } else if (error.status === 400) {
            errorMsg = 'Impossible de modifier un mot de passe d\'un compte créé avec google/facebook.';
        }
        return throwError(errorMsg);
    }

    private handleErrorRegister(error: HttpErrorResponse) {
        let errorMsg = 'Une erreur interne s\'est produite, merci de contacter le support';
        if (error.status === 400) {
            errorMsg = 'Un compte cette email existe déjà.';
        }
        return throwError(errorMsg);
    }

    private getTokenExpirationDate(jwtDecoded: { exp: number; }) {
        if (jwtDecoded.exp === undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(jwtDecoded.exp);
        return date;
    }

    getLoggedUser(): UserToken {
        return this.user.value;
    }

}
