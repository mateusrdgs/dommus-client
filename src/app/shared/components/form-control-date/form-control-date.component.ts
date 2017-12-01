import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-date',
  templateUrl: './form-control-date.component.html',
  styleUrls: ['./form-control-date.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlDateComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormControlDateComponent)
    }
  ]
})
export class FormControlDateComponent {

  @Input() controlName: string;
  @Input() control: FormControl;
  private _self = this;
  public _value: string;

  constructor() { }

  public writeValue(value: string) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn) {
    this.propagateTouch = fn;
  }

  public validate(c: FormControl) {
    return (c.valid) ? null : {
      valid: {
        valid: false
      }
    };
  }

  private propagateChange = (_: any) => {};

  private propagateTouch = (_: any) => {};

  public onTouched() {
    this.propagateTouch(null);
  }

  public onChange(event) {
    const { value } = event.target;
    if (value !== '' && (value !== null || value !== undefined)) {
      this._value = event.target.value;
    }
    this.propagateChange(this._value);
  }

}
