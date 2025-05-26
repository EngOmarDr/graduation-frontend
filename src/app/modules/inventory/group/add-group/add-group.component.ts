import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { CardComponent } from '../../../shared/components/card-form.component';
import { GroupService } from '../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    MatAutocompleteModule,
    CardComponent,
  ],
  templateUrl: './add-group.component.html',
})
export class AddGroupComponent {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(GroupService);
  private router = inject(Router);

  results = [];

  form = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],
    parentId: [undefined, { validators: [], disabled: true }],
    note: [''],
  });

  onSubmit() {
    if (this.form.valid) {
      this.service.createGroup(this.form.getRawValue()).subscribe({
        next: (res) => {
          console.log('Currency created:', res);
          this.router.navigate(['/groups']);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
