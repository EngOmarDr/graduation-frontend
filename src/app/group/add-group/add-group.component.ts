import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { ValidationMessageComponent } from '../../../components/validation-message.component';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    MatAutocompleteModule,
    CardComponent
],
  templateUrl: './add-group.component.html',
})
export class AddGroupComponent {
  private fb = inject(NonNullableFormBuilder);

  results = [];

  form = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],
    primaryGroup: ['', { validators: [], disabled: true }],
    note: [''],
  });

  onSubmit() {
    alert(this.form.valid);
  }
}
