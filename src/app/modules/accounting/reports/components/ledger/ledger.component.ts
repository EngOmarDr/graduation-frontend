import { Component, inject } from '@angular/core';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  imports: [CardComponent, CustomFieldComponent, ReactiveFormsModule],
})
export class LedgerComponent {
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    account: ['', [Validators.required]],
  });

  onSubmit() {}
}
