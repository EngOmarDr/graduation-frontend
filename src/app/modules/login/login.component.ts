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
import { TranslateModule } from '@ngx-translate/core';
import { Roles } from 'app/core/constants/roles.enum';
import { StorageService } from 'app/core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private fb = inject(NonNullableFormBuilder);
  private storageService = inject(StorageService);

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
          console.log('====================================');
          console.log();
          console.log('====================================');
          this.storageService.role == Roles.PURCHASING_MANAGER ?
          this.router.navigate(['/purchases'])
          : this.router.navigate(['/'])
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
