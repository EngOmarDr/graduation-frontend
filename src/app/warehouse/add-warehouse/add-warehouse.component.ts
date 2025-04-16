import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith, tap } from 'rxjs';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ValidationMessageComponent } from '../../../components/validation-message.component';
import { CardComponent } from '../../../components/card-form.component';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    MatAutocompleteModule,
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
