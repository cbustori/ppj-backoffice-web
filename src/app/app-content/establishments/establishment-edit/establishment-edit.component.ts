import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlaceType } from 'src/app/shared/models/place';
import { CreatePlaceGQL } from 'src/app/shared/gql/create-place';
import { Message } from 'primeng/components/common/api';
import { PlaceGQL } from 'src/app/shared/gql/place.gql';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { Address } from 'src/app/shared/models/address';
import { PlaceService } from 'src/app/shared/place.service';

declare var google: any;

@Component({
    selector: 'app-establishment-edit',
    templateUrl: './establishment-edit.component.html',
    styleUrls: ['./establishment-edit.component.css'],
})
export class EstablishmentEditComponent implements OnInit, OnDestroy {
    routeSub: Subscription;
    place = new Restaurant();
    placeTypes: { label: string; value: string }[];
    msgs: Message[] = [];
    uploadedFiles: any[] = [];
    options: any;
    overlays: any[] = [];
    map: any;

    constructor(
        private route: ActivatedRoute,
        private placeGQL: PlaceGQL,
        private createPlaceGQL: CreatePlaceGQL,
        private placeService: PlaceService
    ) {}

    ngOnInit() {
        this.options = {
            center: { lat: 0, lng: 0 },
            zoom: 14,
        };
        this.place.address = new Address();
        this.placeTypes = Object.keys(PlaceType).map((key) => {
            return { label: PlaceType[key], value: key };
        });
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.placeGQL
                .watch({ placeId: params.id })
                .valueChanges.pipe(map((result) => result.data.place))
                .subscribe((place) => {
                    this.place = place;
                    this.map.setCenter({
                        lat: this.place.address.location[0],
                        lng: this.place.address.location[1],
                    });
                    // TODO customiser le marker sur la gmap
                    /* const icon = {
                        url: place.address.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                      }; */
                    this.overlays = [
                        new google.maps.Marker({
                            position: {
                                lat: place.address.location[0],
                                lng: place.address.location[1],
                            },
                            //icon: icon,
                            title: place.name,
                        }),
                    ];
                });
        });
    }

    setMap(event) {
        this.map = event.map;
    }

    onSelectFile(event) {
        // vérification que le nombre d'images ne dépasse pas la limite autorisée
        if (event.limit) {
            this.uploadedFiles.splice(event.index);
        }
    }

    onDeleteFile(index: number) {
        this.place.pictures.splice(index, 1);
    }

    onSubmit() {
        this.msgs = [];
        window.scrollTo(0, 0);
        this.createPlaceGQL
            .mutate(this.place, this.uploadedFiles)
            .subscribe((place) => {
                this.place = place;
                this.uploadedFiles = [];
                this.placeService.pushPlace(place);
                this.msgs.push({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Les informations ont bien été prises en compte!',
                });
            }, (error) => {
                this.msgs.push({
                    severity: 'error',
                    summary: 'Attention',
                    detail: 'Une erreur est survenue. Veuillez réessayer ultérieurement!',
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
