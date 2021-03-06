import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-number',
  templateUrl: './form-control-number.component.html',
  styleUrls: ['./form-control-number.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlNumberComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormControlNumberComponent)
    }
  ]
})
export class FormControlNumberComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() control: FormControl;
  @Input() placeholder = 'Enter here...';
  private _self = this;
  public _value: number;

  constructor() { }

  public writeValue(value: number) {
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
      this._value = parseInt(event.target.value, 10);
    }
    this.propagateChange(this._value);
  }

}
