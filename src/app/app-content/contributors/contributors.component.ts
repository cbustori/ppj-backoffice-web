import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserStatus } from 'src/app/shared/models/user';
import { Message } from 'primeng/components/common/api';
import { Place } from 'src/app/shared/models/place';
import { PlaceService } from 'src/app/shared/place.service';
import { Contributor } from 'src/app/shared/models/contributor';

@Component({
    selector: 'app-contributors',
    templateUrl: './contributors.component.html',
    styleUrls: ['./contributors.component.css'],
})
export class ContributorsComponent implements OnInit {
    contributors: Contributor[] = [];
    msgs: Message[] = [];
    places: { label: string; value: Place }[];

    constructor(private placeService: PlaceService) {}

    ngOnInit() {
        this.places = this.placeService.getPlaces().map((place) => {
            return { label: place.name, value: place };
        });
    }

    onSubmit(form: NgForm) {
        this.msgs = [];
        const email = form.value.email;
        const places = form.value.etabs;
        const contrib = new Contributor();
        contrib.email = email;
        contrib.places = places;
        contrib.userStatus = UserStatus.WAITING_FOR_VALIDATION.key;
        this.contributors.push(contrib);
        this.msgs.push({
            severity: 'success',
            summary: 'Succès',
            detail:
                'Un email de confirmation a été envoyé à <b>' + email + '</b>!',
        });
    }

    onDelete(contrib: Contributor) {}
}
