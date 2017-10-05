import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-switch',
  templateUrl: './form-control-switch.component.html',
  styleUrls: ['./form-control-switch.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlSwitchComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormControlSwitchComponent)
    }
  ]
})
export class FormControlSwitchComponent {

  @Input() controlName: string;
  @Input() control: FormControl;
  private _self = this;
  private _value: boolean;

  constructor() { }

  public writeValue(value: boolean) {
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
    const { checked } = event.target;
    if (checked !== '' && (checked !== null || checked !== undefined)) {
      this._value = checked;
    }
    this.propagateChange(this._value);
  }

}
