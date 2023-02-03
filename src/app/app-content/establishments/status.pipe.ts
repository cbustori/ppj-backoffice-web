import { Pipe, PipeTransform } from '@angular/core';
import { PlaceStatus } from 'src/app/shared/models/place';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return PlaceStatus[value];
  }

}
