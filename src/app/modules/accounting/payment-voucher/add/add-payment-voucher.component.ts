import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Currency } from '../../currency/models/currency.model';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { CardComponent } from '../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';

@Component({
  selector: 'app-payment-voucher',
  imports: [
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ValidationMessageComponent,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './add-payment-voucher.component.html',
})
export class AddPaymentVoucherComponent implements OnInit {
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    account: ['', Validators.required],
    date: [this.getCurrentDate(), Validators.required],
    currency: ['', Validators.required],
    equality: this.fb.control<number | undefined>(
      undefined,
      Validators.required
    ),
    notes: [''],
    rows: this.fb.array<FormGroup>([], Validators.required),
  });

  currencies: Currency[] = [];
  filteredOptions: Observable<any> = new Observable();

  get rows() {
    return this.form.get('rows') as FormArray<FormGroup>;
  }

  getRowFormGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }
  onSubmit() {
    alert('submit');
  }

  sum = 0;
  minus = 0;

  ngOnInit(): void {
    this.currencies = [
      {
        id: 1,
        code: 'code',
        currencyValue: 1,
        name: 'ليرة سورية',
      },
      {
        id: 2,
        code: 'code2',
        currencyValue: 10000,
        name: 'دولار',
      },
    ];
    // this.form.controls.currency.valueChanges.subscribe((value) => {
    //   this.form.controls.equality.setValue(
    //     this.currencies.find((currnecy) => `${currnecy.id}` == value)?.equality,
    //     { emitEvent: false }
    //   );
    // });
    // this.form.controls.currency.setValue(this.toOption()[0]?.key.toString());
  }

  options = [];

  accounts: any = [];

  getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  createItemRow(): FormGroup {
    const newRow = this.fb.group({
      debit: this.fb.control<number | undefined>(undefined, [
        Validators.min(0),
        Validators.required,
      ]),
      account: ['', Validators.required],
      notes: [''],
    });

    newRow.controls.debit.valueChanges.subscribe((_) => {
      this.calculateSum();
    });

    return newRow;
  }

  addRow(): void {
    const newItem = this.createItemRow();
    this.rows.push(newItem);
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  calculateSum() {
    this.sum = 0;
    this.rows.controls.forEach((group: FormGroup) => {
      const amount = group.get('debit')?.value;
      this.sum += amount ? amount : 0;
    });
  }

  toOption() {
    return this.currencies.map((e) => ({
      key: e.id,
      value: e.name,
    }));
  }
}
