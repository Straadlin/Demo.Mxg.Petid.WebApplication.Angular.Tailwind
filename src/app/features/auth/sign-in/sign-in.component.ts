import { ROUTINGS } from '../../../shared/constants';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  hasEmailError,
  isRequired,
} from '../../../shared/validators/validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/data-access/auth.service';
import { toast } from 'ngx-sonner';
import { FormSignIn } from '../../../shared/interfaces/forms/form-sign-in.interface';
import { StorageService } from '../../../shared/data-access/storage.service';
import { AuthSignInResponseDto } from '../../../shared/interfaces/dtos/auth/sign-in/auth-signin-response-dto.interface';
import { AuthStateService } from '../../../core/data-access/auth-state.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private authStateService = inject(AuthStateService);

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
    ]),
  });

  constructor() {}

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailRequired() {
    return hasEmailError(this.form);
  }

  async submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    if (!email || !password) return;

    this._authService.signIn(email, password).subscribe({
      next: (response: AuthSignInResponseDto) => {

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        this.authStateService.signIn(accessToken, refreshToken);

        toast.success('Sesión iniciada correctamente.');
        this._router.navigateByUrl(ROUTINGS.MY_ACCOUNT.MY_ACCOUNT);
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        toast.error('Ocurrió un error.');
      },
    });
  }
}
