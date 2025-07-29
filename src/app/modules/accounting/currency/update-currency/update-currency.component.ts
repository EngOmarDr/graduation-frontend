import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/currency.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-edit-currency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    TranslateModule,
  ],
  templateUrl: './update-currency.component.html',
})
export class UpdateCurrencyComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private fb = inject(NonNullableFormBuilder);
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private currencyService = inject(CurrencyService);

  currencyId!: number;

  editCurrencyForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    balance: [1, [Validators.required, Validators.min(0)]],
    partName: this.fb.control<undefined | string>(undefined),
    partPrecision: this.fb.control<undefined | number>(undefined, [
      Validators.min(0),
    ]),
  });

  ngOnInit(): void {
    this.currencyId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.currencyId) {
      alert('Invalid currency ID');
      this.location.back();
      return;
    }

    this.currencyService.getCurrencyById(this.currencyId).subscribe({
      next: (currency) => {
        this.editCurrencyForm.patchValue({
          code: currency.code,
          name: currency.name,
          balance: currency.currencyValue,
          partName: currency.partName,
          partPrecision: currency.partPrecision,
        });
        console.log(currency);
      },
      error: () => {
        alert('Currency not found');
        this.location.back();
      },
    });
  }

  onSubmit() {
    if (this.editCurrencyForm.valid && this.currencyId) {
      const formValue = this.editCurrencyForm.controls;

      const updatedCurrency: Currency = {
        id: this.currencyId,
        code: formValue.code.value,
        name: formValue.name.value,
        currencyValue: formValue.balance.value,
        partName: formValue.partName.value,
        partPrecision: formValue.partPrecision.value
          ? +formValue.partPrecision.value
          : undefined,
      };
      console.log(typeof updatedCurrency.partPrecision);
      console.log(updatedCurrency.partPrecision);

      this.currencyService
        .updateCurrency(this.currencyId, updatedCurrency)
        .subscribe({
          next: () => {
            this.alert.showSuccess('updated');
            this.location.back();
          },
          error: (err) => {
            console.error('Update failed', err);
            alert('Update failed');
          },
        });
    }
  }
}
