import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../../../shared/components/custom-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { Account } from 'app/modules/accounting/account/models/account';

@Component({
  selector: 'app-journal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    NgSelectModule,
    ValidationMessageComponent,
  ],
  templateUrl: './add-journal.component.html',
})
export class AddJournalComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private currencyService = inject(CurrencyService);
  private accountService = inject(AccountService);

  currencies: Currency[] = [];
  searchAccounts$: Observable<Account[]> = of();
  form = this.fb.group({
    date: [this.getCurrentDate(), [Validators.required]],
    postDate: [this.getCurrentDate()],
    currency: ['1', [Validators.required]],
    equality: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    notes: [''],
    items: this.fb.array<FormGroup>(
      [
        this.fb.group({
          account: ['', Validators.required],
          notes: [''],
          debit: ['', [Validators.min(0), Validators.required]],
          credit: ['', [Validators.min(0), Validators.required]],
          currency: ['', [Validators.required]],
          balance: this.fb.control<number>(1, Validators.required),
          equality: this.fb.control<number>(1, Validators.required),
          group: ['', [Validators.required]],
          date: ['', [Validators.required]],
          contraAccount: ['', [Validators.required]],
        }),
      ],
      Validators.required
    ),
  });

  sumDebit = 0;
  sumCredit = 0;
  minus = 0;

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
        this.form.controls.currency.setValue(data[0]?.id?.toString() ?? '1');
      },
    });
    this.searchAccounts$ = this.accountService.getAccounts();
    this.form.controls.currency.valueChanges.subscribe((value) => {
      this.form.controls.equality.setValue(
        this.currencies.find((currnecy) => `${currnecy.id}` == value)
          ?.currencyValue,
        { emitEvent: false }
      );
    });
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    console.log(this.form.value);
  }

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  createItemRow(): FormGroup {
    const newRow = this.fb.group({
      account: ['', Validators.required],
      notes: [''],
      debit: ['', [Validators.min(0), Validators.required]],
      credit: ['', [Validators.min(0), Validators.required]],
      currency: [''],
      balance: this.fb.control<number>(1, Validators.required),
      equality: this.fb.control<number>(1, Validators.required),
      group: ['', [Validators.required]],
      date: ['', [Validators.required]],
      contraAccount: ['', [Validators.required]],
    });
    newRow.controls.currency.valueChanges.subscribe((value) => {
      newRow.controls.equality.setValue(
        this.currencies.find((currnecy) => `${currnecy.id}` == value)
          ?.currencyValue ?? 0,
        { emitEvent: false }
      );
      newRow.controls.balance.setValue(
        parseFloat((1 / newRow.controls.equality.value).toFixed(5)),
        {
          emitEvent: false,
        }
      );
    });

    newRow.controls.debit.valueChanges.subscribe((_) => {
      newRow.controls.credit.setValue('0', { emitEvent: false });
      this.calculateSum();
    });
    newRow.controls.credit.valueChanges.subscribe((_) => {
      newRow.controls.debit.setValue('0', { emitEvent: false });
      this.calculateSum();
    });

    newRow.controls.balance.valueChanges.subscribe((balance) => {
      const newValue =
        balance != 0 ? (1 / (balance ?? 0)).toFixed(5) : '0.00000';
      newRow.controls.equality.setValue(parseFloat(newValue), {
        emitEvent: false,
      });
    });

    newRow.controls.equality.valueChanges.subscribe((eq) => {
      const newBalance = (1 / (eq ?? 0)).toFixed(5);
      newRow.controls.balance.setValue(parseFloat(newBalance), {
        emitEvent: false,
      });
    });
    return newRow;
  }

  addRow(): void {
    const newItem = this.createItemRow();
    this.items.push(newItem);
  }

  removeRow(index: number): void {
    this.items.removeAt(index);

    this.items.at(0).controls['fact'].setValue(1);
  }

  calculateSum() {
    this.sumDebit = this.sumCredit = 0;
    this.items.controls.forEach((group: FormGroup) => {
      const amountDebit = group.get('debit')?.value ?? 0;
      const amountCredit = group.get('credit')?.value ?? 0;
      this.sumDebit += amountDebit;
      this.sumCredit += amountCredit;
    });
    this.minus = this.sumDebit - this.sumCredit;
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  toOption(): {
    key: number;
    value: string;
  }[] {
    return this.currencies.map((e) => ({
      key: e.id!,
      value: e.name,
    }));
  }
}
