import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/components/common/api';

import { EventsService } from 'src/app/shared/events.service';
import { EventType } from 'src/app/shared/models/event';
import { CreateEventGQL } from 'src/app/shared/gql/create-event.gql';
import { Dish } from 'src/app/shared/models/dish';
import { Event } from 'src/app/shared/models/event';
import { Place } from 'src/app/shared/models/place';
import { DeleteEventGQL } from 'src/app/shared/gql/delete-event.gql';
import { UserService } from 'src/app/shared/user-service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnDestroy {
    routeSub: Subscription;
    fr: any;
    event: Event;
    types: any[];
    places: Place[];
    uploadedFiles: any[] = [];
    isSubmitting = false;
    msgs: Message[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private userService: UserService,
        private createEventGQL: CreateEventGQL,
        private deleteEventGQL: DeleteEventGQL
    ) {}

    ngOnInit() {
        this.msgs = [];
        this.types = Object.keys(EventType).map((key) => {
            return { label: EventType[key], value: key };
        });
        this.places = this.userService.getCurrentUser().managedPlaces.map((mp) => mp.place);
        this.event = new Dish();
        this.event.place = this.places[0];
        this.fr = {
            firstDayOfWeek: 1,
            dayNames: [
                'Dimanche',
                'Lundi',
                'Mardi',
                'Mercredi',
                'Jeudi',
                'Vendredi',
                'Samedi',
            ],
            dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
            monthNames: [
                'Janvier',
                'Février',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre',
            ],
            monthNamesShort: [
                'Jan',
                'Fév',
                'Mar',
                'Avr',
                'Mai',
                'Jun',
                'Jul',
                'Août',
                'Sep',
                'Oct',
                'Nov',
                'Déc',
            ],
            today: "Aujourd'hui",
            clear: 'Fermer',
            dateFormat: 'dd/mm/yy',
            weekHeader: 'Se',
        };
        this.routeSub = this.route.params.subscribe((params: Params) => {
            if (params.id) {
                const event = this.eventsService.getEventById(params.id);
                this.event = event;
                this.event.availableOn = new Date(this.event.availableOn);
            }
        });
    }

    onSelectFile(event: { limit: boolean; index: number }) {
        if (event.limit) {
            const index = event.index < 0 ? 0 : event.index;
            this.uploadedFiles.splice(index);
        }
    }

    onDeleteFile(index: number) {
        this.event.pictures.splice(index, 1);
    }

    onSubmit(form: NgForm) {
        this.msgs = [];
        this.isSubmitting = true;
        window.scrollTo(0, 0);
        switch (EventType[this.event.type]) {
            case EventType.DISH_OF_THE_DAY:
                this.createEventGQL
                    .mutate(this.event, this.uploadedFiles)
                    .subscribe(
                        (event) => {
                            this.isSubmitting = false;
                            this.event = event as Dish;
                            this.event.availableOn = new Date(
                                this.event.availableOn
                            );
                            this.eventsService.pushEvent(event);
                            this.router.navigate(['/events', event.id, 'edit']);
                            this.msgs.push({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Modifications enregistrées!',
                            });
                        },
                        (error) => {
                            console.error(error);
                            this.isSubmitting = false;
                            this.msgs.push({
                                severity: 'error',
                                summary: 'Attention',
                                detail:
                                    'Une erreur est survenue. Veuillez réessayer ultérieurement!',
                            });
                        }
                    );
                break;
            case EventType.BREAKFAST_OF_THE_DAY:
                // TODO
                break;
            case EventType.GOUTER_OF_THE_DAY:
                // TODO
                break;
            case EventType.COCKTAIL_OF_THE_DAY:
                // TODO
                break;
            case EventType.HAPPY_HOUR:
                // TODO
                break;
            default:
                this.isSubmitting = false;
                this.msgs.push({
                    severity: 'error',
                    summary: 'Attention',
                    detail:
                        'Une erreur est survenue. Veuillez réessayer ultérieurement!',
                });
        }
    }

    onDelete(event, form: NgForm) {
        this.msgs = [];
        if (this.event.id) {
            this.deleteEventGQL
                .mutate({
                    eventId: this.event.id,
                })
                .subscribe(
                    () => {
                        this.eventsService.deleteEvent(this.event.id);
                        this.router.navigate(['/events/new']);
                    },
                    (error) => {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Attention',
                            detail:
                                'Une erreur est survenue. Veuillez réessayer ultérieurement!',
                        });
                    }
                );
        } else {
            form.reset();
            this.event = new Dish();
        }
    }

    ngOnDestroy() {
        this.isSubmitting = false;
        this.routeSub.unsubscribe();
    }
}
