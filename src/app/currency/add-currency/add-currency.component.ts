import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { CardComponent } from '../../../components/card-form.component';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'app-add-currency',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    CardComponent,
  ],
  templateUrl: './add-currency.component.html',
})
export class AddCurrencyComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.currencyForm.controls.balance.valueChanges.subscribe((balance) => {
      const newValue =
        balance != 0 ? (1 / (balance ?? 0)).toFixed(5) : '0.00000';
      this.currencyForm.controls.eq.setValue(parseFloat(newValue), {
        emitEvent: false,
      });
    });

    this.currencyForm.controls.eq.valueChanges.subscribe((eq) => {
      const newBalance = (1 / (eq ?? 0)).toFixed(5);
      this.currencyForm.controls.balance.setValue(parseFloat(newBalance), {
        emitEvent: false,
      });
    });

    this.currencyForm.controls.partName.valueChanges
      .pipe(
        tap(() => this.currencyForm.controls.partName.markAsDirty()),
        startWith(this.currencyForm.controls.partName.value)
      )
      .subscribe((partName) => {
        if (partName.trim().length > 0) {
          this.currencyForm.controls.partValue.addValidators(
            Validators.required
          );
          this.currencyForm.controls.partValue.enable();
        } else {
          this.currencyForm.controls.partValue.removeValidators(
            Validators.required
          );
          this.currencyForm.controls.partValue.disable();
        }
        this.currencyForm.controls.partValue.updateValueAndValidity();
      });
  }

  currencyForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    balance: this.fb.control<null | number>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    eq: this.fb.control<null | number>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    partName: [''],
    partValue: ['', [Validators.required, Validators.min(0)]],
  });

  onSubmit() {
    alert(this.currencyForm.valid);
  }
}
