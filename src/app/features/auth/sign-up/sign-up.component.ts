import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  hasEmailError,
  isRequired,
} from '../../../shared/validators/validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/data-access/auth.service';
import { toast } from 'ngx-sonner';
import { FormSignUp } from '../../../shared/interfaces/forms/form-sign-up.interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required, // Validara que tenga un dato
      Validators.email, // Validara que tenga el formato de un correo
    ]),
    password: this._formBuilder.control('', [
      Validators.required, // Validara que tenga un dato
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
    console.log('submit');

    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    if (!email || !password) return;

    this._authService.signUp(email, password, 'Prueba', 'Prueba').subscribe({
      next: (response) => {
        console.log(response);
        toast.success('Usuario creado correctamente.');
        this._router.navigateByUrl('/home');
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        toast.error('Ocurrió un error.');
      },
    });
  }
}
