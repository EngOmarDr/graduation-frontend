import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray ,ReactiveFormsModule } from '@angular/forms';
import { Currency } from '../accounting/currency/service/currency';
import { CardComponent } from '../../components/card-form.component';
import { CustomFieldComponent } from '../../components/custom-field.component';
import { CustomSelectComponent } from '../../components/custom-select.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-voucher',
  imports: [CardComponent, CustomFieldComponent, CustomSelectComponent, CommonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './payment-voucher.component.html',
  styleUrl: './payment-voucher.component.css'
})
export class PaymentVoucherComponent implements OnInit {
  fb = inject(FormBuilder);
  form!: FormGroup;

  currencies: Currency[] = [
    { id: 1, equality: 1.0, name: 'ليرة سورية' },
    { id: 2, equality: 0.75, name: 'دولار' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      account: [''],
      date: [''],
      currency: ['1'],
      rate: [1],
      description: [''],
      rows: this.fb.array(Array(9).fill(0).map(() => this.fb.group({
        debit: [''],
        credit: [''],
        account: [''],
        description: ['']
      }))),
    });
  }

  get rows() {
    return this.form.get('rows') as FormArray;
  }
  get currencyOptions() {
    return this.currencies.map(c => ({ key: c.id, value: c.name }));
  }
  getRowFormGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }
}
