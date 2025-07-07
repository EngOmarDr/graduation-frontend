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
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/']);
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
