import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith, tap } from 'rxjs';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CardComponent } from '../../../shared/components/card-form.component';

import { CurrencyService } from '../services/currency.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-add-currency',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    CardComponent,
    TranslateModule
  ],
  templateUrl: './add-currency.component.html',
  standalone: true,
})
export class AddCurrencyComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private router = inject(Router);

  currencyForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    balance: this.fb.control<null | number>(null, [Validators.required, Validators.min(0)]),
    eq: this.fb.control<null | number>(null, [Validators.required, Validators.min(0)]),
    partName: [''],
    partValue: ['', [Validators.min(0)]],
  });

  ngOnInit(): void {
    this.currencyForm.controls.balance.valueChanges.subscribe((balance) => {
      const newValue = balance != 0 ? (1 / (balance ?? 0)).toFixed(5) : '0.00000';
      this.currencyForm.controls.eq.setValue(parseFloat(newValue), { emitEvent: false });
    });

    this.currencyForm.controls.eq.valueChanges.subscribe((eq) => {
      const newBalance = (1 / (eq ?? 0)).toFixed(5);
      this.currencyForm.controls.balance.setValue(parseFloat(newBalance), { emitEvent: false });
    });

    this.currencyForm.controls.partName.valueChanges.subscribe((partName) => {
      if (partName.trim().length > 0) {
        this.currencyForm.controls.partValue.addValidators(Validators.required);
        this.currencyForm.controls.partValue.enable();
      } else {
        this.currencyForm.controls.partValue.removeValidators(Validators.required);
        this.currencyForm.controls.partValue.disable();
      }
      this.currencyForm.controls.partValue.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.currencyForm.invalid) return;

const data = {
  code: this.currencyForm.value.code ?? undefined,
  name: this.currencyForm.value.name ?? undefined,
  currencyValue: this.currencyForm.value.balance ?? undefined,
  partName: this.currencyForm.value.partName ?? undefined,
  partPrecision: Number(this.currencyForm.value.partValue) ?? undefined,
};

    this.currencyService.createCurrency(data).subscribe({
      next: (res) => {
        this.alert.showSuccess('added');
        console.log('Currency created:', res);
        this.router.navigate(['/currencies']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
