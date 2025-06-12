import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray, FormGroup, FormsModule, NonNullableFormBuilder,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { Account } from 'app/modules/accounting/account/models/account';
import { JournalService } from '../../service/journal.service';
import { JournalRequest } from 'app/modules/accounting/journal/models/journal.model';

import { CardComponent } from '../../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../../../shared/components/custom-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';

@Component({
  selector: 'app-add-journal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    NgSelectModule,
    ValidationMessageComponent
  ],
  templateUrl: './add-journal.component.html',
})
export class AddJournalComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private accountService = inject(AccountService);
  private journalService = inject(JournalService);

  currencies: Currency[] = [];
  searchAccounts$: Observable<Account[]> = this.accountService.getAccounts();
  response: any;

  form = this.fb.group({
    date: [this.getCurrentDate(), Validators.required],
    branchId: [1, Validators.required],
    currencyId: ['1', Validators.required],
    currencyValue: [1, Validators.required],
    items: this.fb.array<FormGroup>([], Validators.required),
  });

  sumDebit = 0;
  sumCredit = 0;
  minus = 0;

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      this.form.controls.currencyId.setValue(data[0]?.id!.toString() ?? '1');
    });

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find(c => `${c.id}` === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, { emitEvent: false });
    });

    this.addRow();
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  createItemRow(): FormGroup {
    const row = this.fb.group({
      accountId: ['', Validators.required],
      debit: [0, [Validators.required, Validators.min(0)]],
      credit: [0, [Validators.required, Validators.min(0)]],
      currencyId: ['1', Validators.required],
      currencyValue: [1, Validators.required],
      date: [this.getCurrentDate(), Validators.required],
    });

    row.controls.debit.valueChanges.subscribe(() => {
      row.controls.credit.setValue(0, { emitEvent: false });
      this.calculateSum();
    });
    row.controls.credit.valueChanges.subscribe(() => {
      row.controls.debit.setValue(0, { emitEvent: false });
      this.calculateSum();
    });
    row.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find(c => `${c.id}` === value);
      row.controls.currencyValue.setValue(curr?.currencyValue ?? 1, { emitEvent: false });
    });

    return row;
  }

  addRow() {
    this.items.push(this.createItemRow());
  }

  removeRow(i: number) {
    this.items.removeAt(i);
    this.calculateSum();
  }

  calculateSum() {
    this.sumDebit = 0;
    this.sumCredit = 0;
    this.items.controls.forEach(g => {
      this.sumDebit += +g.get('debit')?.value || 0;
      this.sumCredit += +g.get('credit')?.value || 0;
    });
    this.minus = this.sumDebit - this.sumCredit;
  }

  toOption() {
    return this.currencies.map(c => ({ key: c.id!, value: c.name }));
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) ||
           item.code.toLowerCase().includes(term);
  }

private toDateTimeString(dateStr: string): string {
  return dateStr ? `${dateStr}T00:00:00` : '';
}

  onSubmit() {
    if (this.form.invalid) return;

    const fv = this.form.value;
    const req: JournalRequest = {
      journalHeader: {
        branchId: fv.branchId ?? 0,
         date: this.toDateTimeString(fv.date ?? ''),
        debit: this.sumDebit.toFixed(2),
        credit: this.sumCredit.toFixed(2),
        currencyId: fv.currencyId ? +fv.currencyId : 0,
        currencyValue: fv.currencyValue?.toString() ?? '0',
        isPosted: false
      },
      journalItems: (fv.items ?? []).map((it: any) => ({
        accountId: +it.accountId,
        debit: it.debit.toFixed(2),
        credit: it.credit.toFixed(2),
        currencyId: +it.currencyId,
        currencyValue: it.currencyValue.toString(),
        date: this.toDateTimeString(it.date)
      }))
    };

    this.journalService.createJournal(req).subscribe({
      next: res => this.response = res,
      error: err => console.error(err)
    });
  }
}
