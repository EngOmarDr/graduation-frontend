import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';

@Component({
  selector: 'app-edit-currency',
  imports: [CommonModule, ReactiveFormsModule, CustomFieldComponent],
  templateUrl: './update-currency.component.html',
})
export class UpdateCurrencyComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  private location = inject(Location);
  constructor(private route: Router) {
    const navigation = this.route.getCurrentNavigation();
    const state = navigation?.extras.state as {
      id: number;
      code: string;
      name: string;
      balance: number;
      eq: number;
    };
    if (state) {
      this.editCurrencyForm.patchValue({
        code: state.code,
        name: state.name,
        balance: state.balance,
        eq: state.eq,
      });
    } else {
      this.location.back();
    }
  }
  ngOnInit(): void {
    this.editCurrencyForm.controls.balance.valueChanges.subscribe((balance) => {
      const newValue = balance != 0 ? 1 / balance : 0;
      this.editCurrencyForm.controls.eq.setValue(newValue, {
        emitEvent: false,
      });
    });

    this.editCurrencyForm.controls.eq.valueChanges.subscribe((eq) => {
      if (eq !== null && eq != 0) {
        this.editCurrencyForm.controls.balance.setValue(1 / eq, {
          emitEvent: false,
        });
      }
    });
  }

  editCurrencyForm = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    balance: [1, [Validators.required, Validators.min(0)]],
    eq: [1, [Validators.required, Validators.min(0)]],
  });

  onSubmit() {
    alert(this.editCurrencyForm.valid);
  }
}
