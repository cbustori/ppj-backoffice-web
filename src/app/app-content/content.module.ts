import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/components/common/messageservice';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenuComponent } from './layouts/header/menu/menu.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { DropdownModule } from 'primeng/dropdown';
import { PlanningComponent } from './planning/planning.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { GMapModule } from 'primeng/gmap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { GalleriaModule } from 'primeng/galleria';
import { ErrorComponent } from './layouts/error/error.component';
import { AccessdeniedComponent } from './layouts/accessdenied/accessdenied.component';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { AppMenuitemComponent } from './layouts/header/menu/menuitem.component';
import { EventComponent } from './events/event/event.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsStartComponent } from './events/events-start/events-start.component';
import { EventDetailsComponent } from './events/event/event-details/event-details.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EventTypePipe } from './events/events-list/event-type.pipe';
import { EstablishmentListComponent } from './establishments/establishment-list/establishment-list.component';
import { StatusPipe } from './establishments/status.pipe';
import { ContributorsComponent } from './contributors/contributors.component';
import { ShortenPipe } from '../shared/shorten.pipe';
import { EstablishmentEditComponent } from './establishments/establishment-edit/establishment-edit.component';
import { PicturesComponent } from './pictures/pictures.component';
import { PlacesPipe } from './contributors/places.pipe';

@NgModule({
    declarations: [
        HomeComponent,
        ContentComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        PlanningComponent,
        DashboardComponent,
        EventComponent,
        EventsListComponent,
        EventsStartComponent,
        ErrorComponent,
        AccessdeniedComponent,
        NotfoundComponent,
        AppMenuitemComponent,
        EventComponent,
        EventsListComponent,
        EventsStartComponent,
        EventDetailsComponent,
        EventTypePipe,
        EstablishmentListComponent,
        EstablishmentEditComponent,
        StatusPipe,
        ShortenPipe,
        PlacesPipe,
        ContributorsComponent,
        PicturesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DialogModule,
        ToolbarModule,
        FormsModule,
        UserModule,
        FullCalendarModule,
        DropdownModule,
        FieldsetModule,
        InputTextModule,
        InputTextareaModule,
        GMapModule,
        ButtonModule,
        CalendarModule,
        ChipsModule,
        CheckboxModule,
        DragDropModule,
        InputSwitchModule,
        ChartModule,
        TableModule,
        GalleriaModule,
        FileUploadModule,
        MultiSelectModule,
        SelectButtonModule,
        ListboxModule,
        PanelModule,
        CarouselModule,
        AutoCompleteModule,
        RadioButtonModule,
        MessageModule,
        AccordionModule,
        MessagesModule,
        CardModule,
        ProgressSpinnerModule,
    ],
    providers: [MessageService],
    exports: [ContentComponent, HeaderComponent, FooterComponent],
})
export class ContentModule {}
