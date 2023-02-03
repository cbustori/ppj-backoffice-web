import { UserValidationComponent } from './app-content/user/user-validation/user-validation.component';
import { UserRegistrationComponent } from './app-content/user/user-registration/user-registration.component';
import { UserLoginComponent } from './app-content/user/user-login/user-login.component';
import { LoginGuard } from './shared/security/login.guard';
import { AuthGuard } from './shared/security/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './app-content/content.component';
import { PlanningComponent } from './app-content/planning/planning.component';
import { DashboardComponent } from './app-content/dashboard/dashboard.component';
import { UserProfileComponent } from './app-content/user/user-profile/user-profile.component';
import { HomeComponent } from './app-content/home/home.component';
import { ErrorComponent } from './app-content/layouts/error/error.component';
import { AccessdeniedComponent } from './app-content/layouts/accessdenied/accessdenied.component';
import { NotfoundComponent } from './app-content/layouts/notfound/notfound.component';
import { EventsResolverService } from './shared/events-resolver.service';
import { EventComponent } from './app-content/events/event/event.component';
import { EventsListComponent } from './app-content/events/events-list/events-list.component';
import { EventDetailsComponent } from './app-content/events/event/event-details/event-details.component';
import { PlaceResolverService } from './shared/place-resolver.service';
import { EstablishmentListComponent } from './app-content/establishments/establishment-list/establishment-list.component';
import { ContributorsComponent } from './app-content/contributors/contributors.component';
import { EstablishmentEditComponent } from './app-content/establishments/establishment-edit/establishment-edit.component';
import { EventsStartComponent } from './app-content/events/events-start/events-start.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            {
                path: 'planning',
                component: PlanningComponent,
                resolve: [EventsResolverService],
            },
            {
                path: 'events',
                children: [
                    {
                        path: 'new',
                        component: EventComponent,
                        resolve: [PlaceResolverService],
                    },
                    {
                        path: ':id/edit',
                        component: EventComponent,
                        resolve: [EventsResolverService, PlaceResolverService],
                    },
                    {
                        path: 'list/past',
                        component: EventsStartComponent,
                        resolve: [EventsResolverService],
                    },
                    {
                        path: 'list/incoming',
                        component: EventsStartComponent,
                        resolve: [EventsResolverService],
                    },
                    {
                        path: ':id',
                        component: EventDetailsComponent,
                        resolve: [EventsResolverService, PlaceResolverService],
                    },
                ],
            },
            {
                path: 'establishments',
                children: [
                    { path: ':id/edit', component: EstablishmentEditComponent },
                    { path: ':id/contributors', component: ContributorsComponent },
                    {
                        path: 'list',
                        component: EstablishmentListComponent,
                        resolve: [PlaceResolverService],
                    },
                    { path: 'contributors', component: ContributorsComponent, resolve: [PlaceResolverService] },
                ],
            },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user/profile', component: UserProfileComponent },
        ],
    },

    {
        path: '',
        canActivate: [LoginGuard],
        children: [
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegistrationComponent },
        ],
    },
    { path: 'user/validation', component: UserValidationComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'accessdenied', component: AccessdeniedComponent },
    { path: '404', component: NotfoundComponent },
    { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
