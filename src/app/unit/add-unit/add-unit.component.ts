import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { CustomSelectComponent } from '../../../components/custom-select.component';
import { startWith, tap } from 'rxjs';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CustomSelectComponent,
    MatAutocompleteModule,
    CardComponent
],
  templateUrl: './add-unit.component.html',
})
export class AddUnitComponent {
  private fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.form.controls.isPrimary.valueChanges
      .pipe(
        tap(() => this.form.controls.primaryGroup.markAsDirty()),
        startWith(this.form.controls.isPrimary.value)
      )
      .subscribe((isPrimary) => {
        if (isPrimary == 'false') {
          this.form.controls.primaryGroup.addValidators(
            Validators.required
          );
          this.form.controls.primaryGroup.enable();
        } else {
          this.form.controls.primaryGroup.removeValidators(
            Validators.required
          );
          this.form.controls.primaryGroup.disable();
        }
        this.form.controls.primaryGroup.updateValueAndValidity();
      });
  }

  results = [];

  form = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],

    isPrimary: ['false', Validators.required],
    primaryGroup: ['', { validators: [], disabled: true }],
    note: [''],
  });

  onSubmit() {
    alert(this.form.valid);
  }
}
