import { FormControl } from '@angular/forms';

export function validateSet(values: Array<number>) {
  return (control: FormControl) => {
    const parsedValue = parseInt(control.value, 10);
    const filteredValue = values.some((value) => value === parsedValue);
    return filteredValue ? null : {
      validateSet: {
        valid: false
      }
    };
  };
}
