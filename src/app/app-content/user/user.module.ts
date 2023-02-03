import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import { UserValidationComponent } from './user-validation/user-validation.component';

@NgModule({
    declarations: [
        UserProfileComponent,
        UserRegistrationComponent,
        UserLoginComponent,
        UserValidationComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        FieldsetModule,
        ToastModule,
        ButtonModule,
        FieldsetModule,
        MessagesModule,
        MessageModule,
        InputTextModule,
        AutoCompleteModule,
        CheckboxModule,
        DialogModule,
        HttpClientModule,
        CalendarModule,
        StepsModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        CardModule,
        FileUploadModule
    ]
})
export class UserModule { }
