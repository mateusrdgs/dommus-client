import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'form-control-password',
  templateUrl: './form-control-password.component.html',
  styleUrls: ['./form-control-password.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlPasswordComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormControlPasswordComponent)
    }
  ]
})
export class FormControlPasswordComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() control: FormControl;
  @Input() placeholder = 'Enter here...';
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
    this._value = event.target.value;
    this.propagateChange(this._value);
  }

}
