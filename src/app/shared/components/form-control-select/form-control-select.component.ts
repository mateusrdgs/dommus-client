import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';


@Component({
  selector: 'form-control-select',
  templateUrl: './form-control-select.component.html',
  styleUrls: ['./form-control-select.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlSelectComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormControlSelectComponent)
    }
  ]
})
export class FormControlSelectComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() control: FormControl;
  @Input() defaultOption: string;
  @Input() items: Array<any>;
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
    if (event.target.selectedIndex > 0) {
      this._value = event.target.value;
      this.propagateChange(this._value);
    }
  }

}
