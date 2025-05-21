import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from '@angular/forms';
import { CustomFieldComponent } from '../../components/custom-field.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private fb = inject(NonNullableFormBuilder);

  constructor(private router: Router) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {}

  login() {
    console.log(this.form.get('email')?.errors);
    console.log(this.form.get('password')?.errors);

    if (this.form.valid) {
      console.log(this.form.value);

      this.loginService
        .login(
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Login failed:', err);
            alert(err);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
