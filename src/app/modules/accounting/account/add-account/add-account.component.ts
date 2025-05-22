import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-account',
  imports: [
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-account.component.html',
})
export class AddAccountComponent {
  readonly finalAccounts = [
    { key: 0, value: 'متاجرة' },
    { key: 1, value: 'أرباح و خسائر' },
    { key: 2, value: 'ميزانية' },
  ];

  readonly types = [
    { key: 0, value: 'بدون' },
    { key: 1, value: 'مدين' },
    { key: 2, value: 'دائن' },
  ];

  readonly accountTypes = [
    { key: true, value: 'primary account' },
    { key: false, value: 'sub account' },
  ];

  readonly currencies = [
    { key: 0, value: 'ليرة سورية' },
    { key: 1, value: 'دولار' },
  ];

  private fb = inject(NonNullableFormBuilder);
  results = [
    'a',
    'b',
    '1',
    '2',
    '3',
    '4',
    '5',
    'ba',
    'aa',
    'bb',
    'ab',
    'bc',
    'ac',
    'b1',
  ];
  form = this.fb.group({
    code: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    name: ['', [Validators.required]],
    isPrimary: [],
    primaryAccount: [''],
    type: [],
    max: [],
    maxType: [],
    finalAccount: [],
    currency: [],
    note: [],
  });

  onSubmit() {
    console.log('submit');
  }
}
