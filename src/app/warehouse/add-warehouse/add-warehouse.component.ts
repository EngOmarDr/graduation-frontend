import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith, tap } from 'rxjs';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { CustomSelectComponent } from '../../../components/custom-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ValidationMessageComponent } from '../../../components/validation-message.component';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    CustomSelectComponent,
    MatAutocompleteModule,
    ValidationMessageComponent,
  ],
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.css',
})
export class AddWarehouseComponent  implements OnInit{
  private fb = inject(NonNullableFormBuilder);

  results = [];

  costCenterForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    isPrimary: ['', Validators.required],
    primaryCostCenter: [''],
    address: [''],
    note: [''],
  });

  ngOnInit(): void {
    this.costCenterForm.controls.isPrimary.valueChanges
      .pipe(
        tap(() => this.costCenterForm.controls.primaryCostCenter.markAsDirty()),
        startWith(this.costCenterForm.controls.isPrimary.value)
      )
      .subscribe((isPrimary) => {
        if (isPrimary == 'false') {
          this.costCenterForm.controls.primaryCostCenter.addValidators(
            Validators.required
          );
          this.costCenterForm.controls.primaryCostCenter.enable();
        } else {
          this.costCenterForm.controls.primaryCostCenter.removeValidators(
            Validators.required
          );
          this.costCenterForm.controls.primaryCostCenter.disable();
        }
        this.costCenterForm.controls.primaryCostCenter.updateValueAndValidity();
      });
  }

  onSubmit() {
    alert(this.costCenterForm.valid);
  }
}
