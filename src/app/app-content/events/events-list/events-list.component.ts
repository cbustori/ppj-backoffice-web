import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Event } from 'src/app/shared/models/event';
import { EventsService } from 'src/app/shared/events.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
    events: Event[];
    eventsSub: Subscription;
    title: string;

    constructor(
        private eventsService: EventsService,
        private router: Router,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        const currentDay = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        if (this.router.url.endsWith('past')) {
            this.title = 'Evènements passés';
            this.events = this.eventsService
                .getEvents()
                .filter(
                    (e) =>
                        this.datePipe.transform(
                            new Date(e.availableOn),
                            'yyyy-MM-dd'
                        ) < currentDay
                );
        } else {
            this.title = 'Evènements à venir';
            this.events = this.eventsService
                .getEvents()
                .filter(
                    (e) =>
                        this.datePipe.transform(
                            new Date(e.availableOn),
                            'yyyy-MM-dd'
                        ) >= currentDay
                );
        }
        this.events.sort((e1, e2) => {
            if (e1.availableOn > e2.availableOn) {
                return 1;
            }
            return -1;
        });
    }

    onEventSearch(event, eventId) {
        this.router.navigate(['./events', eventId]);
    }

    onEventEdit(event, eventId) {
        this.router.navigate(['./events', eventId, 'edit']);
    }
}
