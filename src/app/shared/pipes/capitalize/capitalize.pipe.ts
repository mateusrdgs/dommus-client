import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return value !== undefined || null ? value.charAt(0).toUpperCase().concat(value.slice(1)) : value;
  }

}
