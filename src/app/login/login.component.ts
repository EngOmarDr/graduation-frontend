import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomFieldComponent } from '../../components/custom-field.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SearchInputComponent } from "../../components/search-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomFieldComponent, RouterModule, SearchInputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: any;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      console.log(this.form.value);

        this.router.navigate(['/products']);
        } else {
      this.form.markAllAsTouched();
    }
  }
}
