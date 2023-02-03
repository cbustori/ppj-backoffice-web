import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/place';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user-service';

@Component({
    selector: 'app-establishment-list',
    templateUrl: './establishment-list.component.html',
    styleUrls: ['./establishment-list.component.css'],
})
export class EstablishmentListComponent implements OnInit {
    establishments: Place[];

    constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.establishments = this.userService.getCurrentUser().managedPlaces.map(mp => mp.place);
    }

    onEdit(etabId: string) {
        this.router.navigate(['/establishments', etabId, 'edit'], {relativeTo: this.activatedRoute});
    }

    onContributors(etabId: string) {
        this.router.navigate(['/establishments', etabId, 'contributors'], {relativeTo: this.activatedRoute});
    }
}
