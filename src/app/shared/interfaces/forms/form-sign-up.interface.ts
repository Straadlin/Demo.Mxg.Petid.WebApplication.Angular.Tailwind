import { FormControl } from "@angular/forms";

export interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
