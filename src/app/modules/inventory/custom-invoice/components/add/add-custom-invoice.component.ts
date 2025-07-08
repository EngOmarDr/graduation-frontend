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
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { WarehouseResponse } from 'app/modules/inventory/warehouse/models/response/warehouse-response';
import { AccountSearchComponent } from '../../../../shared/account-search/account-search.component';
import { InvoiceTypeResponse } from 'app/modules/inventory/invoice-type/models/response/invoice-type-response';

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
    AccountSearchComponent,
  ],
  templateUrl: './add-custom-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomInvoiceComponent implements OnInit, OnDestroy {
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
  invoiceType!: InvoiceTypeResponse;
  private subscriptions = new Subscription();

  form = this.fb.group({
    currencyId: [1, Validators.required],
    currencyValue: [1, Validators.required],
    date: [this.currentDateTime, Validators.required],
    billType: [0, Validators.required],
    isPosted: [0, Validators.required],
    total: [0],
    notes: [''],
    clienAccountId: [],
    warehouseId: this.fb.control<number | undefined>(
      undefined,
      Validators.required
    ),
    invoiceItems: this.fb.array<FormGroup<any>>([], Validators.required),
    invoiceDiscounts: this.fb.array<FormGroup<any>>([]),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.invoiceType = history.state?.object;

      //   this.form = this.fb.group({
      //     date: [this.currentDateTime, Validators.required],
      //     warehouseId: this.fb.control<number | undefined>(
      //       undefined,
      //       Validators.required
      //     ),
      //     currencyId: [
      //       this.journalType.defaultCurrency?.id ?? 1,
      //       Validators.required,
      //     ],
      //     currencyValue: [
      //       this.journalType.defaultCurrency?.currencyValue ?? 1,
      //       Validators.required,
      //     ],
      //     parentType: [this.journalType.id],
      //     isPosted: [this.journalType.autoPost],
      //     account: this.fb.control<AccountResponse | undefined>(
      //       this.journalType.defaultAccountId,
      //       this.journalType.defaultAccountId ? Validators.required : undefined
      //     ),
      //     journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
      //   });
    });

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find((c) => c.id === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
    });

    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      // if (!this.journalType.defaultCurrency) {
      this.form.controls.currencyId.setValue(data[0]?.id!);
      // }
    });

    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
      if (data.length) {
        this.form.controls.warehouseId.setValue(data[0].id);
      }
    });

    // this.searchAccounts$ = this.accountService.getAccounts();

    this.addInvoiceDiscount();
    this.addInvoiceItem();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // if (this.sumDebit == 0 && this.sumCredit == 0) {
    //   alert('enter some journal items');
    //   return;
    // }

    // let data: CreateJournalRequest = {
    //   date: this.form.controls.date.value,
    //   warehouseId: this.form.controls.warehouseId.value!,
    //   currencyId: this.form.controls.currencyId.value,
    //   currencyValue: this.form.controls.currencyValue.value!,
    //   parentType: this.journalType.id,
    //   isPosted: this.form.controls.isPosted.value,
    //   journalItems: this.form.controls.journalItems
    //     .getRawValue()
    //     .map<CreateJournalItemRequest>((e) => ({
    //       accountId: e['accountId']!,
    //       notes: this.journalType.fieldNotes ? e['notes'] : null,
    //       debit: this.journalType.fieldDebit ? e['debit'] : 0,
    //       credit: this.journalType.fieldCredit ? e['credit'] : 0,
    //       currencyId: this.journalType.fieldCurrencyName
    //         ? e['currencyId']
    //         : undefined,
    //       currencyValue: this.journalType.fieldCurrencyEquilty
    //         ? e['currencyValue']
    //         : e['currencyId']
    //         ? this.currencies.filter((i) => i.id == e['currencyId'])[0]
    //             .currencyValue
    //         : undefined,
    //       date: this.journalType.fieldDate ? e['date'] : null,
    //     })),
    // };
    // if (this.journalType.defaultAccountId && this.minus != 0) {
    //   console.log('here');

    //   data.journalItems.push({
    //     accountId: this.journalType.defaultAccountId.id,
    //     notes: undefined,
    //     debit:
    //       this.minus > 0
    //         ? 0
    //         : Math.abs(this.minus) / this.form.controls.currencyValue.value,
    //     credit:
    //       this.minus > 0
    //         ? Math.abs(this.minus) / this.form.controls.currencyValue.value
    //         : 0,
    //   });
    //   console.log(data.journalItems);
    // }
    // this.journalService.createJournal(data).subscribe({
    //   next: (_) => this.form.reset(),
    //   error: (err) => console.error(err),
    // });
  }

  addInvoiceItem() {
    const row = this.fb.group({
      productId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      notes: [''],
      quantity: this.fb.control<number>(0, Validators.min(0)),
      individual: this.fb.control<number>(0, Validators.min(0)),
      total: this.fb.control<number>(0),
      unitId: this.fb.control<number | undefined>(undefined),
    });

    row.controls.quantity.valueChanges.subscribe((v) => {
      row.controls.total.setValue(v * row.controls.individual.value, {
        emitEvent: false,
      });
    });

    row.controls.individual.valueChanges.subscribe((v) => {
      row.controls.total.setValue(v * row.controls.quantity.value, {
        emitEvent: false,
      });
    });

    this.invoiceItems.push(row);
  }

  removeInvoiceItem(i: number) {
    this.invoiceItems.removeAt(i);
  }

  get invoiceItems(): FormArray<FormGroup> {
    return this.form.get('invoiceItems') as FormArray<FormGroup>;
  }

  addInvoiceDiscount() {
    const row = this.fb.group({
      accountId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      discount: [0],
      discountRate: [0],
      extra: [0],
      extraRate: [0],
      notes: [''],
    });

    row.controls.discount.valueChanges.subscribe((v) => {
      row.controls.discountRate.setValue(this.form.controls.total.value / v, {
        emitEvent: false,
      });
    });

    row.controls.discountRate.valueChanges.subscribe((v) => {
      row.controls.discount.setValue(
        this.form.controls.total.value * (v / 100),
        {
          emitEvent: false,
        }
      );
    });

    row.controls.extra.valueChanges.subscribe((v) => {
      row.controls.extraRate.setValue(this.form.controls.total.value / v, {
        emitEvent: false,
      });
    });

    row.controls.extraRate.valueChanges.subscribe((v) => {
      row.controls.extra.setValue(
        this.form.controls.total.value * (v / 100),
        {
          emitEvent: false,
        }
      );
    });

    this.invoiceDiscounts.push(row);
  }

  removeInvoiceDiscount(i: number) {
    this.invoiceDiscounts.removeAt(i);
  }

  get invoiceDiscounts(): FormArray<FormGroup> {
    return this.form.get('invoiceDiscounts') as FormArray<FormGroup>;
  }
  get currentDateTime(): string {
    return new Date().toISOString().slice(0, 16);
  }
}
