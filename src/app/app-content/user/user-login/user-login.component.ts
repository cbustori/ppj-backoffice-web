import { MessageService } from 'primeng/components/common/messageservice';
import { SecurityService } from '../../../shared/security/security.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    @ViewChild('loginForm', { static: false }) loginForm: NgForm;
    @ViewChild('frmLostPassword', { static: false }) frmLostPassword: NgForm;

    msgLogin: Message[] = [];
    display: boolean;
    isSubmitting = false;
    isSubmittingLostPassord = false;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private securityService: SecurityService) { }

    ngOnInit() {
        // TODO TO DELETE
        setTimeout(() => {
            this.loginForm.setValue({ email: 'admin@enrealit.fr', password: 'ppj' });
        });
    }

    onSubmit() {
        if (!this.loginForm.valid) {
            return;
        }
        this.isSubmitting = true;
        this.securityService.login(
            this.loginForm.value.email,
            this.loginForm.value.password)
            .subscribe(() => '', err => this.printMessageErrorMsg(err));
    }

    onSubmitLostPassword() {
        if (!this.frmLostPassword.valid) {
            return;
        }
        this.isSubmittingLostPassord = true;
        this.securityService
            .lostPassword(this.frmLostPassword.value.emailLost)
            .subscribe(() => this.printMessageSuccess('Un email de demande de mot de passe vous a été envoyé. ' +
                'Merci de regarder dans votre boite de réception et/ou votre boite spam pour le trouver. 👌'),
                err => this.printMessageError(err));
    }

    private printMessageErrorMsg(err: string) {
        this.msgLogin = [];
        this.isSubmitting = false;
        this.msgLogin.push({ severity: 'error', detail: err });
    }

    private printMessageError(err: string) {
        this.isSubmittingLostPassord = false;
        this.messageService.add({ key: 'loginMessage', severity: 'error', detail: err });
    }

    private printMessageSuccess(successMsg: string) {
        this.isSubmittingLostPassord = false;
        this.display = false;
        this.messageService.add({ key: 'loginMessage', severity: 'success', detail: successMsg });
    }

}
