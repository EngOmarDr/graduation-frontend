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
import { Observable } from 'rxjs';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { JournalService } from '../../service/journal.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { CreateJournalRequest } from '../../models/request/create-journal-request.model';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { WarehouseResponse } from 'app/modules/inventory/warehouse/models/response/warehouse-response';
import { AccountSearchComponent } from '../../../../shared/account-search/account-search.component';

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
    ValidationMessageComponent,
    AccountSearchComponent,
  ],
  templateUrl: './add-journal.component.html',
})
export class AddJournalComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly currencyService = inject(CurrencyService);
  private readonly accountService = inject(AccountService);
  private readonly journalService = inject(JournalService);
  private readonly warehouseService = inject(WarehouseService);

  warehouses: WarehouseResponse[] = [];
  currencies: Currency[] = [];
  searchAccounts$: Observable<AccountResponse[]> =
    this.accountService.getAccounts();

  form = this.fb.group({
    date: [this.getCurrentDate(), Validators.required],
    warehouseId: this.fb.control<undefined | number>(
      undefined,
      Validators.required
    ),
    currencyId: [1, Validators.required],
    currencyValue: [1, Validators.required],
    parentType: [0],
    isPosted: [true],
    journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
  });

  sumDebit = 0;
  sumCredit = 0;
  minus = 0;

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      this.form.controls.currencyId.setValue(data[0]?.id! ?? 1);
    });

    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
      if (data.length) {
        this.form.controls.warehouseId.setValue(data[0].id);
      }
    });

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find((c) => c.id === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
    });

    this.form.controls.currencyValue.valueChanges.subscribe((_) => {
      this.calculateSum();
    });

    this.addRow();
  }

  getCurrentDate(): string {
    console.log(new Date(Date.now()).toISOString().slice(0, 16));

    return new Date().toISOString().slice(0, 16);
  }

  get journalItems(): FormArray<FormGroup> {
    return this.form.get('journalItems') as FormArray<FormGroup>;
  }

  createItemRow(): FormGroup {
    const row = this.fb.group({
      accountId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      notes: [''],
      debit: this.fb.control<number | null>(null, Validators.min(0)),
      credit: this.fb.control<number | null>(null, Validators.min(0)),
      currencyId: this.fb.control<number | undefined>(undefined),
      currencyValue: this.fb.control<number | undefined>(undefined),
      // date: [],
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
      const curr = this.currencies.find((c) => c.id === value);
      row.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
      this.calculateSum();
    });

    return row;
  }

  addRow() {
    this.journalItems.push(this.createItemRow());
  }

  removeRow(i: number) {
    this.journalItems.removeAt(i);
    this.calculateSum();
  }

  calculateSum() {
    this.sumDebit = 0;
    this.sumCredit = 0;
    this.journalItems.controls.forEach((g) => {
      this.sumDebit +=
        +g.get('debit')?.value *
        (g.get('currencyValue')?.value ??
          this.form.controls.currencyValue.value);
      this.sumCredit +=
        +g.get('credit')?.value *
        (g.get('currencyValue')?.value ??
          this.form.controls.currencyValue.value);
    });
    this.minus = this.sumDebit - this.sumCredit;
  }

  toOption() {
    return this.currencies.map((c) => ({ key: c.id!, value: c.name }));
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('valid');

    let data: CreateJournalRequest = {
      date: this.form.controls.date.value,
      warehouseId: this.form.controls.warehouseId.value ?? 0,
      currencyId: this.form.controls.currencyId.value,
      currencyValue: this.form.controls.currencyValue.value,
      parentType: this.form.controls.parentType.value,
      isPosted: this.form.controls.isPosted.value,
      journalItems: this.form.controls.journalItems.getRawValue().map((e) => ({
        accountId: e!['accountId']!,
        notes: e!['notes'],
        debit: e!['debit']!,
        credit: e!['credit']!,
        currencyId: e!['currencyId'],
        currencyValue: e!['currencyValue'],
        // date: e!['date'],
      })),
    };
    this.journalService.createJournal(data).subscribe({
      next: (_) => this.form.reset(),
      error: (err) => console.error(err),
    });
  }
}
