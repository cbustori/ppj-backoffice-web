import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from 'src/app/shared/models/event';

@Pipe({
    name: 'eventType'
})
export class EventTypePipe implements PipeTransform {

    transform(value: string) {
        return EventType[value];
    }

}
