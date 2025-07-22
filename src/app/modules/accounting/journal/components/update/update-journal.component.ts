import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
import { ActivatedRoute } from '@angular/router';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { WarehouseResponse } from 'app/modules/inventory/warehouse/models/response/warehouse-response';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-journal',
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
  templateUrl: './update-journal.component.html',
})
export class UpdateJournalComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);
  private currencyService = inject(CurrencyService);
  private accountService = inject(AccountService);
  private journalService = inject(JournalService);
  private warehouseService = inject(WarehouseService);

  warehouses: WarehouseResponse[] = [];
  currencies: Currency[] = [];
  searchAccounts$: Observable<AccountResponse[]> =
    this.accountService.getAccounts();
  journalId = 0;
  form = this.fb.group({
    date: [this.getCurrentDate(), Validators.required],
    branchId: [1, Validators.required],
    currencyId: [1, Validators.required],
    currencyValue: [1, Validators.required],
    isPosted: [true],
    journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
  });

  sumDebit = signal(0);
  sumCredit = signal(0);
  minus = computed(() => this.sumDebit() - this.sumCredit());

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
    });

    this.warehouseService.getAll().subscribe((data) => {
      this.warehouses = data;
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.location.back();
    } else {
      this.journalId = Number.parseInt(id);
    }
    const navigation = window.history.state;
    if (navigation.object) {
      this.form.patchValue(navigation.object);

      navigation.object.journalItems.map((e: any) => {
        this.addRow(e);
      });
    } else {
      this.journalService.getJournalsById(this.journalId).subscribe({
        next: (next) => {
          this.form.patchValue(next);
        },
        error: () => {
          this.location.back();
        },
      });
    }

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies.find((c) => c.id === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
    });

    this.form.controls.currencyValue.valueChanges.subscribe((_) => {
      this.calculateSum();
    });
    this.calculateSum();
  }

  getCurrentDate(): string {
    return new Date().toISOString().slice(0, 16);
  }

  get journalItems(): FormArray<FormGroup> {
    return this.form.get('journalItems') as FormArray<FormGroup>;
  }

  createItemRow(e: any): FormGroup {
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
      date: [],
    });
    if (e) {
      row.patchValue(e);
    }

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

  addRow(e: any | undefined) {
    this.journalItems.push(this.createItemRow(e));
  }

  removeRow(i: number) {
    this.journalItems.removeAt(i);
    this.calculateSum();
  }

  calculateSum() {
    let totalDebit = 0;
    let totalCredit = 0;
    this.journalItems.controls.forEach((control) => {
      const currencyValue =
        control.value.currencyValue ?? this.form.value.currencyValue;
      totalDebit += (control.value.debit || 0) * currencyValue;
      totalCredit += (control.value.credit || 0) * currencyValue;
    });
    this.sumCredit.set(totalCredit);
    this.sumDebit.set(totalDebit);
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
    let data: CreateJournalRequest = {
      date: this.form.controls.date.value,
      branchId: this.form.controls.branchId.value,
      currencyId: this.form.controls.currencyId.value,
      currencyValue: this.form.controls.currencyValue.value,
      kind: null,
      parentId: 0,
      parentType: 0,
      isPosted: this.form.controls.isPosted.value,
      journalItems: this.form.controls.journalItems.getRawValue().map((e) => ({
        accountId: e!['accountId']!,
        notes: e!['notes'],
        debit: e!['debit']!,
        credit: e!['credit']!,
        currencyId: e!['currencyId'],
        currencyValue: e!['currencyValue'],
        date: e!['date'],
      })),
    };
    this.journalService.updateJournal(data, this.journalId).subscribe({
      next: (_) => this.location.back(),
      error: (err) => console.error(err),
    });
  }
}
