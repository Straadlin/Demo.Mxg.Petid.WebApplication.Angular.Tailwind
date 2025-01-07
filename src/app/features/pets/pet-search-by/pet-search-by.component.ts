import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { patternValidator } from '../../../shared/validators/patternValidator';
import { TranslateModule, TranslateService  } from '@ngx-translate/core';

@Component({
  selector: 'app-pet-search-by',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './pet-search-by.component.html',
  styles: ``
})
export default class PetSearchByComponent {
  private translateService = inject(TranslateService);
  public form: FormGroup;
  public errorMessage: string | null = null;

  public constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      petId: [
        '',
        [
          Validators.required,
          patternValidator(/^[a-zA-Z0-9]{30,50}$/, 'invalidFormat')
        ],
      ],
    });
  }

  public onSubmit(): void {
    if (this.form.valid)
    {
      const petId = this.form.get('petId')?.value;
      this.router.navigate(['pet/detail', petId]);
    }
  }

  public getErrorMessage(field: string): string | null {
    const control = this.form.get(field);
    let message: string = '';

    if (control?.touched || control?.dirty) {
      if (control?.errors) {
        if (control.errors['required']) {
          this.translateService
            .get('PET.SEARCH.MESSAGE_FIELD_IS_NECESSARY')
            .subscribe((translation: string) =>
            {
              message = translation;
            });
          return message;
        }

        if (control.errors['invalidFormat']) {
          this.translateService
            .get('PET.SEARCH.MESSAGE_PET_ID_MUST_BE')
            .subscribe((translation: string) =>
            {
              message = translation;
            });
          return message;
        }
      }
    }

    return null;
  }

}
