import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { Event } from '../shared/models/event';
import { EventsService } from './events.service';

@Injectable({ providedIn: 'root' })
export class EventsResolverService implements Resolve<Event[]> {
    constructor(
        private eventsService: EventsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const events = this.eventsService.getEvents();
        if (events.length === 0) {
            return this.eventsService.fetchEventsByUser();
        } else {
            return events;
        }

    }
}
