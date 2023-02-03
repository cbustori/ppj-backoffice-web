import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentModule } from './app-content/content.module';
import { GraphQLModule } from './graphql.module';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ContentModule,
        GraphQLModule
    ],
    providers: [DatePipe, { provide: LOCALE_ID, useValue: 'fr-FR' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
