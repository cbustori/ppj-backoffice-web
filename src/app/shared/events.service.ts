import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Event } from '../shared/models/event';
import { EventsByUserAndDateGQL } from './gql/events-by-user-and-date.gql';

@Injectable({ providedIn: 'root' })
export class EventsService {
    eventsSubject = new Subject<Event[]>();
    events: Event[] = [];

    constructor(
        private eventsByUserAndDateGQL: EventsByUserAndDateGQL
    ) {}

    fetchEventsByUser(): Observable<Event[]> {
        return this.eventsByUserAndDateGQL
            .fetch({
                availableOn: new Date(),
            })
            .pipe(
                map(({ data }) => data.eventsByUserAndDate),
                tap((events) => {
                    this.events = events;
                })
            );
    }

    setEvents(events: Event[]) {
        this.events = events;
        this.eventsSubject.next(this.events.slice());
    }

    getEvents() {
        return this.events.slice();
    }

    getEventById(id: string): Event {
        return this.events.find((e) => e.id === id);
    }

    pushEvent(event: Event) {
        const e = this.getEventById(event.id);
        if (!e) {
            this.events.push(event);
        } else {
            const index = this.events.indexOf(e);
            this.events[index] = event;
        }
        this.eventsSubject.next(this.events.slice());
    }

    pushEvents(events: Event[]) {
        this.events.push(...events);
        console.log(this.events);
        this.eventsSubject.next(this.events.slice());
    }

    deleteEvent(id: string) {
        const e = this.getEventById(id);
        const index = this.events.indexOf(e);
        this.events.splice(index, 1);
        this.eventsSubject.next(this.events.slice());
    }
}
