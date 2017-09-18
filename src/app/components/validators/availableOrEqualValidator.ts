import { FormControl } from '@angular/forms';

import { validateSet } from './setValidator';

export function availableOrEqualValidator(current: number, set: Array<number>) {
  return (control: FormControl) => {
    const parsedValue = parseInt(control.value, 10);
    const isEqual = current === parsedValue;
    const isAvailable = validateSet(set)(control);
    return isEqual || (isAvailable === null ? true : false) ? null : {
      validatePin: {
        valid: false
      }
    };
  };
}
