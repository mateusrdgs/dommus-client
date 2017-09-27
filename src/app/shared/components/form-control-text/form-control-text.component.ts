import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'form-control-text',
  templateUrl: './form-control-text.component.html',
  styleUrls: ['./form-control-text.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlTextComponent)
    }
  ]
})
export class FormControlTextComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() value: string;
  @Input() isValid: boolean;

  constructor() { }

  writeValue(value: string): void {
    console.log(value);
    if (value !== undefined) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
