import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'altura'
})
export class AlturaPipe implements PipeTransform {

  transform(value: any): unknown {

    if(value % 10 == 0)
    return value / 100 + "0" + " M";

    return value / 100 +  " M";

  }

}
