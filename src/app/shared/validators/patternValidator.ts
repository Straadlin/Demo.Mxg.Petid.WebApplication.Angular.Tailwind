import { AbstractControl, ValidationErrors } from '@angular/forms';

export function patternValidator(
  pattern: RegExp,
  errorKey: string
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (!pattern.test(value)) {
      return { [errorKey]: true };
    }

    return null;
  };
}
