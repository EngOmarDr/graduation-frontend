import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { ActivatedRoute } from '@angular/router';
import { JournalTypeResponse } from 'app/modules/accounting/journal-type/models/response/journal-type-response.model';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { JournalService } from 'app/modules/accounting/journal/service/journal.service';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import {
  CreateJournalItemRequest,
  CreateJournalRequest,
} from 'app/modules/accounting/journal/models/request/create-journal-request.model';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { WarehouseResponse } from 'app/modules/inventory/warehouse/models/response/warehouse-response';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-add-custom-journal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    NgSelectModule,
    ValidationMessageComponent,
    TranslateModule
  ],
  templateUrl: './add-custom-journal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomJournalComponent implements OnInit, OnDestroy {
  constructor(private alert: AlertService) { }
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly currencyService = inject(CurrencyService);
  private readonly accountService = inject(AccountService);
  private readonly journalService = inject(JournalService);
  private readonly warehouseService = inject(WarehouseService);
  private activatedRoute = inject(ActivatedRoute);

  warehouses: WarehouseResponse[] = [];
  currencies: Currency[] = [];
  searchAccounts$: Observable<AccountResponse[]> =
    this.accountService.getAccounts();
  journalType!: JournalTypeResponse;
  private subscriptions = new Subscription();

  form = this.fb.group({
    date: [this.currentDateTime, Validators.required],
    branchId: this.fb.control<number | undefined>(
      undefined,
      Validators.required
    ),
    currencyId: [1, Validators.required],
    currencyValue: [1, Validators.required],
    parentType: [-1],
    isPosted: [false],
    account: this.fb.control<AccountResponse | undefined>(undefined),
    journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
  });

  sumDebit = 0;
  sumCredit = 0;
  minus = 0;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.journalType = history.state?.['journalType'];
      console.log(this.journalType);

      this.form = this.fb.group({
        date: [this.currentDateTime, Validators.required],
        branchId: this.fb.control<number | undefined>(
          undefined,
          Validators.required
        ),
        currencyId: [
          this.journalType.defaultCurrency?.id ?? 1,
          Validators.required,
        ],
        currencyValue: [
          this.journalType.defaultCurrency?.currencyValue ?? 1,
          Validators.required,
        ],
        parentType: [this.journalType.id],
        isPosted: [this.journalType.autoPost],
        account: this.fb.control<AccountResponse | undefined>(
          this.journalType.defaultAccountId,
          this.journalType.defaultAccountId ? Validators.required : undefined
        ),
        journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
      });
    });

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find((c) => c.id === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
    });

    this.form.controls.currencyValue.valueChanges.subscribe(() => {
      this.calculateSum();
    });

    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      if (!this.journalType.defaultCurrency) {
        this.form.controls.currencyId.setValue(data[0]?.id!);
      }
    });

    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
      if (data.length) {
        this.form.controls.branchId.setValue(data[0].id);
      }
    });

    // this.searchAccounts$ = this.accountService.getAccounts();

    this.addRow();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.sumDebit == 0 && this.sumCredit == 0) {
      alert('enter some journal items');
      return;
    }

    let data: CreateJournalRequest = {
      date: this.form.controls.date.value,
      branchId: this.form.controls.branchId.value!,
      currencyId: this.form.controls.currencyId.value,
      currencyValue: this.form.controls.currencyValue.value!,
      kind: 1,
      parentId: null,
      parentType: this.journalType.id,
      isPosted: this.form.controls.isPosted.value,
      journalItems: this.form.controls.journalItems
        .getRawValue()
        .map<CreateJournalItemRequest>((e) => ({
          accountId: e['accountId']!,
          notes: this.journalType.fieldNotes ? e['notes'] : null,
          debit: this.journalType.fieldDebit ? e['debit'] : 0,
          credit: this.journalType.fieldCredit ? e['credit'] : 0,
          currencyId: this.journalType.fieldCurrencyName
            ? e['currencyId']
            : undefined,
          currencyValue: this.journalType.fieldCurrencyEquilty
            ? e['currencyValue']
            : e['currencyId']
              ? this.currencies.filter((i) => i.id == e['currencyId'])[0]
                .currencyValue
              : undefined,
          date: this.journalType.fieldDate ? e['date'] : null,
        })),
    };
    if (this.journalType.defaultAccountId && this.minus != 0) {
      console.log('here');

      data.journalItems.push({
        accountId: this.journalType.defaultAccountId.id,
        notes: undefined,
        debit:
          this.minus > 0
            ? 0
            : Math.abs(this.minus) / this.form.controls.currencyValue.value,
        credit:
          this.minus > 0
            ? Math.abs(this.minus) / this.form.controls.currencyValue.value
            : 0,
      });
      this.alert.showSuccess('added');
      console.log(data.journalItems);
    }
    this.journalService.createJournal(data).subscribe({
      next: (_) => {
    this.alert.showSuccess('added');
    this.form.reset();
  },
      error: (err) => console.error(err),
    });
  }

  createItemRow(): FormGroup<any> {
    const row = this.fb.group({
      accountId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      notes: [{ value: '', disabled: !this.journalType?.fieldNotes }],
      debit: this.fb.control<number | null>(
        { value: null, disabled: !this.journalType?.fieldDebit },
        Validators.min(0)
      ),
      credit: this.fb.control<number | null>(
        { value: null, disabled: !this.journalType?.fieldCredit },
        Validators.min(0)
      ),
      currencyId: this.fb.control<number | undefined>({
        value: undefined,
        disabled: !this.journalType?.fieldCurrencyName,
      }),
      currencyValue: this.fb.control<number | undefined>({
        value: undefined,
        disabled: !this.journalType?.fieldCurrencyName,
      }),
      date: [{ value: undefined, disabled: !this.journalType?.fieldDate }],
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
      const curr = this.currencies.find((c) => c.id == value);

      row.controls.currencyValue.setValue(curr?.currencyValue, {
        emitEvent: false,
      });
      this.calculateSum();
    });

    row.controls.currencyValue.valueChanges.subscribe(() => {
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

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  compareFn(a: AccountResponse, b: AccountResponse): boolean {
    return a.id >= b.id;
  }

  get journalItems(): FormArray<FormGroup> {
    return this.form.get('journalItems') as FormArray<FormGroup>;
  }
  get currentDateTime(): string {
    return new Date().toISOString().slice(0, 16);
  }
  get currencyOptions() {
    let curr = this.currencies.map((b) => ({ key: b.id, value: b.name }));
    return curr;
  }
  get currencyOptionsWithNull() {
    let curr = this.currencies.map((b) => ({ key: b.id, value: b.name }));
    curr.push({ key: undefined, value: 'no currency' });
    curr.sort((a, b) => {
      return (a.key ?? 0) - (b.key ?? 0);
    });
    return curr;
  }
}
