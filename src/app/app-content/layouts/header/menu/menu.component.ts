import { Component, OnInit } from '@angular/core';
import { ContentComponent } from 'src/app/app-content/content.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    model: any[];

    constructor(public content: ContentComponent) {}

    ngOnInit() {
        this.model = [
            { label: 'Accueil', icon: 'home', routerLink: ['/home'] },
            { label: 'Planning', icon: 'event', routerLink: ['/planning'] },
            { label: 'Evènements', icon: 'local_dining', items: [
                { label: 'Nouvel évènement', routerLink: ['/events/new'] },
                { label: 'Evènements passés', routerLink: ['/events/list/past'] },
                { label: 'Evènements à venir', routerLink: ['/events/list/incoming'] }
            ] },
            { label: 'Etablissements', icon: 'storefront', items: [
                { label: 'Liste des établissements', icon: 'storefront', routerLink: ['/establishments/list'] },
                { label: 'Contributeurs', icon: 'group', routerLink: ['/establishments/contributors'] },
            ] },
        ];
    }
}
