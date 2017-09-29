import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-number',
  templateUrl: './form-control-number.component.html',
  styleUrls: ['./form-control-number.component.styl']
})
export class FormControlNumberComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() control: FormControl;
  @Input() placeholder = 'Enter here...';
  private _self = this;
  private _value: string;

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

  private onTouched() {
    this.propagateTouch(null);
  }

  private onChange(event) {
    this._value = event.target.value;
    this.propagateChange(this._value);
  }

}
