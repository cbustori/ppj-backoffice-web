import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { EventsService } from 'src/app/shared/events.service';
import { Event } from 'src/app/shared/models/event';
import { CreateEventsGQL } from 'src/app/shared/gql/create-events.gql';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('containerEl', { static: false }) container: ElementRef;
    locales = [frLocale];
    lastEvents: any[];
    events: Event[];
    calendarEvents: any[];
    options: any;
    eventsSub: Subscription;
    msgs: Message[] = [];

    constructor(
        private eventsService: EventsService,
        private router: Router,
        private createEventsGQL: CreateEventsGQL,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.options = {
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
            locales: this.locales,
            locale: 'fr',
            height: 640,
            aspectRatio: 1.5,
            droppable: true,
            customButtons: {
                btnCancel: {
                    text: 'Annuler les modifications',
                    click: () => {
                        this.onCancel();
                    },
                },
                btnValidate: {
                    text: 'Valider le planning',
                    click: () => {
                        this.onSubmit();
                    },
                },
            },
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'btnValidate btnCancel',
            },
            drop: (event) => {
                if (event && event.date) {
                    this.onDrop(event);
                }
            },
            eventClick: (e) => {
                this.router.navigate(['./events', e.event.id, 'edit']);
            },
        };

        this.eventsSub = this.eventsService.eventsSubject.subscribe(
            (events) => {
                this.events = events;
                this.setCalendarEvents();
            }
        );
        this.fetchEvents();
    }

    ngAfterViewInit() {
        // init du container de drag&drop selon la doc fullcalendar.io
        new Draggable(this.container.nativeElement, {
            itemSelector: '.draggable-item',
        });
    }

    showMessage(severity: string, message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: severity,
            summary: 'Information',
            detail: message,
        });
        setTimeout(() => {
            this.msgs = [];
        }, 5000);
    }

    setCalendarEvents() {
        this.calendarEvents = this.events.map((e) => {
            return {
                id: e.id,
                title: e.title,
                start: e.availableOn,
                allDay: true,
            };
        });
    }

    fetchEvents() {
        this.events = this.eventsService.getEvents();
        // TODO créer méthode pour récupérer les derniers events (les 7 derniers ?)
        this.lastEvents = this.events.slice();
        this.setCalendarEvents();
    }

    onDrop(draggedEvent) {
        const id = draggedEvent.draggedEl.id;
        const ev = this.events.find((e) => e.id === id);
        this.events.push({ ...ev, id: null, availableOn: draggedEvent.date });
        this.calendarEvents = [
            ...this.calendarEvents,
            {
                title: ev.title,
                start: draggedEvent.date,
                allDay: true,
            },
        ];
    }

    onCancel() {
        if (this.calendarEvents.filter((e) => !e.id).length) {
            this.calendarEvents = this.calendarEvents.filter((e) => e.id);
            this.events = this.events.filter((e) => e.id);
            this.showMessage('warn', 'Modifications annulées!');
        }
    }

    onSubmit() {
        if (this.events.filter((e) => !e.id).length === 0) {
            return;
        }
        this.createEventsGQL
            .mutate({
                events: this.events
                    .filter((e) => !e.id)
                    .map((e) => {
                        return {
                            type: e.type,
                            place: e.place.id,
                            title: e.title,
                            description: e.description,
                            availableOn: this.datePipe.transform(
                                e.availableOn,
                                'yyyy-MM-dd'
                            ),
                            tags: e.tags,
                            pictures: e.pictures,
                            price: e.price,
                        };
                    }),
            })
            .subscribe(
                (response) => {
                    this.eventsService.pushEvents(response.data.createEvents);
                    this.showMessage('success', 'Modifications enregistrées!');
                },
                (error) => {
                    console.error(error);
                    this.showMessage('error', 'Une erreur est survenue!');
                }
            );
    }

    onAddEvent() {
        this.router.navigate(['events/new']);
    }

    ngOnDestroy() {
        this.eventsSub.unsubscribe();
    }
}
