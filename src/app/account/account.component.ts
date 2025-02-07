import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessageComponent } from '../../components/validation-message.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-account',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ValidationMessageComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
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
  accountForm = this.fb.group({
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
