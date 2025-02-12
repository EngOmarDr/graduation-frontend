import { Component, inject, OnInit } from '@angular/core';
import { ValidationMessageComponent } from '../../components/validation-message.component';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { startWith, tap } from 'rxjs';
import { CustomFieldComponent } from "../../components/custom-field.component";
import { CustomSelectComponent } from "../../components/custom-select.component";

@Component({
  selector: 'app-cost-center',
  imports: [
    ValidationMessageComponent,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CustomSelectComponent
],
  templateUrl: './cost-center.component.html',
})
export class CostCenterComponent implements OnInit {
  private readonly req = Validators.required;
  ngOnInit(): void {
    this.costCenterForm.controls.isPrimary.valueChanges
      .pipe(
        tap(() => this.costCenterForm.controls.primaryCostCenter.markAsDirty()),
        startWith(this.costCenterForm.controls.isPrimary.value)
      )
      .subscribe((isPrimary) => {
        if (isPrimary == 'false') {
          this.costCenterForm.controls.primaryCostCenter.addValidators(
            this.req
          );
          this.costCenterForm.controls.primaryCostCenter.enable();
        } else {
          this.costCenterForm.controls.primaryCostCenter.removeValidators(
            this.req
          );
          this.costCenterForm.controls.primaryCostCenter.disable();
        }
        this.costCenterForm.controls.primaryCostCenter.updateValueAndValidity();
      });
  }

  results = [];

  private fb = inject(NonNullableFormBuilder);

  costCenterForm = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],
    isPrimary: ['false', Validators.required],
    primaryCostCenter: new FormControl({ value: '', disabled: true }),
    note: [],
  });

  onSubmit() {
    alert(this.costCenterForm.valid);
  }
}
