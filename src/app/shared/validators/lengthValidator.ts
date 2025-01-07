import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validator about length of a string
export function lengthValidator(
  minLength: number,
  maxLength: number
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (value.length < minLength || value.length > maxLength) {
      return { invalidLength: { min: minLength, max: maxLength } };
    }

    return null;
  };
}
