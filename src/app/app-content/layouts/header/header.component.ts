import { Component, OnInit } from '@angular/core';

import { SecurityService } from '../../../shared/security/security.service';
import { ContentComponent } from './../../content.component';
import { map } from 'rxjs/operators';
import { UserGQL } from 'src/app/shared/gql/user-gql';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    constructor(
        public content: ContentComponent,
        public securityService: SecurityService,
        public userGQL: UserGQL
    ) {}

    profilePicture = 'assets/layout/images/avatar.png';

    ngOnInit() {
        this.userGQL
            .watch()
            .valueChanges.pipe(map((result) => result.data.me))
            .subscribe((user) => {
                if (user.profilePicture) {
                    this.profilePicture = user.profilePicture.url;
                }
            });
    }
}
