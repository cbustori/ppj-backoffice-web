import { Restaurant } from 'src/app/shared/models/restaurant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    PlaceSearchService,
    GooglePlace,
} from 'src/app/tools/gmaps/place-search.service';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/security/security.service';
import { CreatePlaceGQL } from 'src/app/shared/gql/create-place';
import { MenuItem, Message } from 'primeng/api';
import { PlaceStatus, PlaceType } from 'src/app/shared/models/place';
import { Address } from 'src/app/shared/models/address';
import { EnumUtil } from 'src/app/shared/enum-util';

@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
    @ViewChild('registerForm', { static: false }) form: NgForm;
    restaurantFieldsDisable = true;
    hasPlace = false;
    text: string;
    results: any[];
    localization: number[];
    googlePlaceId: string;

    enseigneModel = '';
    addressModel = '';
    phoneNumberModel = '';
    postalCodeModel = '';
    cityModel = '';
    countryModel = '';
    websiteModel = '';
    placeType: string;

    placeTypes: { label: string; value: string }[];
    stepsItems: MenuItem[];
    activeIndex: number;
    msg: Message[] = [];
    isSubmitting = false;

    constructor(
        public router: Router,
        private placeSearchService: PlaceSearchService,
        private securityService: SecurityService,
        private createPlaceGQL: CreatePlaceGQL
    ) {}

    ngOnInit() {
        this.stepsItems = [
            { label: 'Identification' },
            { label: 'Établissement' },
            { label: 'Finalisation' },
        ];
        this.activeIndex = 0;
        this.placeType = 'RESTAURANT';
        this.placeTypes = Object.keys(PlaceType).map((key) => {
            return { label: PlaceType[key], value: key };
        });
    }

    search(event) {
        this.placeSearchService
            .searchPlaces(event.query)
            .subscribe((suggestions) => {
                this.results = suggestions;
            });
    }

    onSelectedSuggestion(value: GooglePlace) {
        this.placeSearchService
            .placeDetails(value.placeId)
            .subscribe((details) => {
                console.log(details);
                this.enseigneModel = details.name;
                this.addressModel = details.vicinity;
                this.postalCodeModel = details.postalCode;
                this.cityModel = details.city;
                this.countryModel = details.country;
                this.phoneNumberModel = details.phoneNumber;
                this.websiteModel = details.website;
                this.localization = details.geometry;
                this.googlePlaceId = details.placeId;
                this.hasPlace = true;
            });
    }

    onClearSelection(event) {
        this.enseigneModel = '';
        this.addressModel = '';
        this.postalCodeModel = '';
        this.cityModel = '';
        this.countryModel = '';
        this.phoneNumberModel = '';
        this.websiteModel = '';
        this.localization = null;
        this.googlePlaceId = '';
        this.hasPlace = false;
    }

    checkEmail() {
        if (!this.form.value.email) {
            return;
        }
        this.isSubmitting = true;
        this.securityService.checkEmail(this.form.value.email).subscribe(
            (res) => {
                if (!res.exist) {
                    this.msg = [];
                    this.activeIndex = 1;
                    return;
                }
                this.msg = [];
                this.msg.push({
                    severity: 'error',
                    detail: 'Un compte avec cette adresse mail existe déja.',
                });
            },
            () => 'TODO',
            () => (this.isSubmitting = false)
        );
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.isSubmitting = true;
        this.securityService
            .register(
                this.form.value.lastName,
                this.form.value.firstName,
                this.form.value.email,
                this.form.value.password,
                this.form.value.phone,
                this.form.value.birthday
            )
            .subscribe(
                () => {
                    const place = new Restaurant();
                    place.googlePlaceId = this.googlePlaceId;
                    place.status = EnumUtil.getEnum(
                        PlaceStatus,
                        'PENDING'
                    ) as PlaceStatus;
                    place.website = this.websiteModel;
                    place.phoneNumber = this.phoneNumberModel;
                    place.name = this.enseigneModel;
                    place.type = EnumUtil.getEnum(
                        PlaceType,
                        'RESTAURANT'
                    ) as PlaceType;
                    const adresse = new Address();
                    adresse.street = this.addressModel;
                    adresse.zipCode = this.postalCodeModel;
                    adresse.city = this.cityModel;
                    adresse.country = this.countryModel;
                    adresse.location = this.localization;
                    place.address = adresse;

                    this.createPlaceGQL.mutate(place, null).subscribe(
                        () => {
                            this.securityService.logout(false);
                            this.activeIndex = 2;
                            this.isSubmitting = false;
                        },
                        () => 'TODO',
                        () => (this.isSubmitting = false)
                    );
                },
                (err) => {
                    this.msg.push({ severity: 'error', detail: err });
                    this.isSubmitting = false;
                }
            );
    }
}
