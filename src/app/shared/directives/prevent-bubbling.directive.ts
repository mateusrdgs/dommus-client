import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventBubbling]'
})
export class PreventBubblingDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): boolean {
    event.stopPropagation();
    return false;
  }

  constructor() { }

}
