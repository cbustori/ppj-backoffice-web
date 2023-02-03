import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from 'src/app/shared/models/user';
import { UserGQL } from 'src/app/shared/gql/user-gql';
import { UpdateProfileGQL } from 'src/app/shared/gql/update-profile.gql';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    user: User;
    newPassword: string;
    profilePicture: File;
    @ViewChild('fileInput', {static: false}) fileInput: FileUpload;

    constructor(
        private userGQL: UserGQL,
        private updateProfileGQL: UpdateProfileGQL
    ) {}

    ngOnInit() {
        this.user = new User();
        this.userGQL.fetch().subscribe(
            (response) => {
                this.user = response.data.me;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onAvatarSelect(event) {
        this.profilePicture = event.files[0];
    }

    onAvatarClick(event) {
        event.preventDefault();
        const fileUpload = this.fileInput.basicFileInput;
        const click = new MouseEvent('click', {bubbles: false});
        fileUpload.nativeElement.dispatchEvent(click);
    }

    onSubmit() {
        this.updateProfileGQL
            .mutate(this.user, this.newPassword, this.profilePicture)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.user = response;
                    this.fileInput.clear();
                },
                (error) => {
                    console.error(error);
                }
            );
    }
}
