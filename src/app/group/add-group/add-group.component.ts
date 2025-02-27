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
import { ValidationMessageComponent } from '../../../components/validation-message.component';
import { startWith, tap } from 'rxjs';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CustomSelectComponent,
    ValidationMessageComponent,
    MatAutocompleteModule,
    CardComponent
],
  templateUrl: './add-group.component.html',
})
export class AddGroupComponent {
  private fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.categoryForm.controls.isPrimary.valueChanges
      .pipe(
        tap(() => this.categoryForm.controls.primaryGroup.markAsDirty()),
        startWith(this.categoryForm.controls.isPrimary.value)
      )
      .subscribe((isPrimary) => {
        if (isPrimary == 'false') {
          this.categoryForm.controls.primaryGroup.addValidators(
            Validators.required
          );
          this.categoryForm.controls.primaryGroup.enable();
        } else {
          this.categoryForm.controls.primaryGroup.removeValidators(
            Validators.required
          );
          this.categoryForm.controls.primaryGroup.disable();
        }
        this.categoryForm.controls.primaryGroup.updateValueAndValidity();
      });
  }

  results = [];

  categoryForm = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],
    isPrimary: ['false', Validators.required],
    primaryGroup: ['', { validators: [], disabled: true }],
    note: [''],
  });

  onSubmit() {
    alert(this.categoryForm.valid);
  }
}
