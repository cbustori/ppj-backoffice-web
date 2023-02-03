import { Pipe, PipeTransform } from '@angular/core';
import { Place } from 'src/app/shared/models/place';

@Pipe({
    name: 'places',
})
export class PlacesPipe implements PipeTransform {
    transform(value: Place[], args?: any): any {
        return value.map(p => p.name);
    }
}
