import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../shared/components/custom-field.component';

@Component({
  selector: 'app-add-branch',
  imports: [
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-branch.component.html',
})
export class AddBranchComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required]],
    phone: [''],
    address: [''],
    note: [''],
  });

  onSubmit() {
    alert(this.form.valid);
  }
}
