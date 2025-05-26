import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { CustomFieldComponent } from '../shared/components/custom-field.component';

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
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
