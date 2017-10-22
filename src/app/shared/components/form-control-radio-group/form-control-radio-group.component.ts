import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-radio-group',
  templateUrl: './form-control-radio-group.component.html',
  styleUrls: ['./form-control-radio-group.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting:  forwardRef(() => FormControlRadioGroupComponent)
    }
  ]
})
export class FormControlRadioGroupComponent implements ControlValueAccessor {

  @Input() control: FormControl;
  @Input() legend: string;
  @Input() fields: any[];
  private _self = this;
  _value: any;

  constructor() { }

  public writeValue(value: any) {
    if (value !== undefined && value !== null) {
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

  private onChange(value) {
    if (value !== '' && (value !== null || value !== undefined)) {
      this._value = value;
      this.propagateChange(this._value);
      if (this.control.untouched) {
        this.control.markAsTouched();
      }
    }
  }

}
