import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { CardComponent } from '../../../shared/components/card-form.component';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    CardComponent,
  ],
  templateUrl: './add-warehouse.component.html',
})
export class AddWarehouseComponent {
  private fb = inject(NonNullableFormBuilder);

  results = [];

  costCenterForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    primaryCostCenter: [''],
    address: [''],
    note: [''],
  });

  onSubmit() {
    alert(this.costCenterForm.valid);
  }
}
