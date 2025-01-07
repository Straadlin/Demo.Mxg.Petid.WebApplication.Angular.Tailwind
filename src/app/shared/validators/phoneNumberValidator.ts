import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(
  minLength: number,
  maxLength: number
) {
  const phonePattern = /^[0-9]+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    if (value.length < minLength || value.length > maxLength || !phonePattern.test(value)) {
      return { invalidPhone: { min: minLength, max: maxLength } };
    }

    return null;
  };
}
