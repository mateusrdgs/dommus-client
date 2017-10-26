import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[modalBody]'
})
export class ModalBodyDirective {

  constructor(
    private _templateRef: TemplateRef<any>
  ) { }

}
