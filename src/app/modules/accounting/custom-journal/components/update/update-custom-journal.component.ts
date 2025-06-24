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
import { Account } from 'app/modules/accounting/account/models/account';
import { NgSelectModule } from '@ng-select/ng-select';
import { BranchResponse } from 'app/modules/branch/models/response/branch-response';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'app/modules/branch/services/branch.service';
import { JournalService } from 'app/modules/accounting/journal/service/journal.service';
import {
  CreateJournalItemRequest,
  CreateJournalRequest,
} from 'app/modules/accounting/journal/models/request/create-journal-request.model';
import { JournalTypeResponse } from 'app/modules/accounting/journal-type/models/response/journal-type-response.model';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';

@Component({
  selector: 'app-update-custom-journal',
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
  templateUrl: './update-custom-journal.component.html',
})
export class UpdateCustomJournalComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly currencyService = inject(CurrencyService);
  private readonly accountService = inject(AccountService);
  private readonly journalService = inject(JournalService);
  private readonly branchService = inject(BranchService);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);

  branches: BranchResponse[] = [];
  currencies: Currency[] = [];
  searchAccounts$: Observable<Account[]> = this.accountService.getAccounts();
  journalType!: JournalTypeResponse;
  journalId = 0;

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
    account: this.fb.control<number | undefined>(undefined),
    journalItems: this.fb.array<FormGroup<any>>([], Validators.required),
  });

  sumDebit = signal(0);
  sumCredit = signal(0);
  minus = computed(() => this.sumDebit() - this.sumCredit());

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      if (!this.journalType.defaultCurrency) {
        // this.form.controls.currencyId.setValue(data[0]?.id!);
      }
    });

    this.branchService.getBranches().subscribe((data) => {
      this.branches = data;
      if (data.length) {
        // this.form.controls.branchId.setValue(data[0].id);
      }
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.location.back();
    } else {
      this.journalId = Number.parseInt(id);
    }
    const navigation = window.history.state;
    if (navigation.journalType) {
      this.journalType = navigation.journalType;
      this.form.controls.account.setValue(
        this.journalType.defaultAccountId?.id
      );
    } else {
      this.location.back();
    }
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

    this.form.controls.currencyValue.valueChanges.subscribe((next) => {
      this.calculateSum(next);
    });
    this.calculateSum();
  }

  createItemRow(e: any): FormGroup {
    const row = this.fb.group({
      accountId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      notes: [{ value: '', disabled: !this.journalType?.fieldNotes }],
      debit: this.fb.control<number | null>(0, Validators.min(0)),
      credit: this.fb.control<number | null>(0, Validators.min(0)),
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
    row.controls.currencyValue.valueChanges.subscribe(() => {
      this.calculateSum();
    });

    return row;
  }

  calculateSum(curValue?: number) {
    let totalDebit = 0;
    let totalCredit = 0;
    this.journalItems.controls.forEach((control) => {
      const currencyValue =
        curValue ??
        control.value.currencyValue ??
        this.form.value.currencyValue;

      totalDebit += this.journalType.fieldDebit
        ? (control.value.debit || 0) * currencyValue
        : 0;
      totalCredit += this.journalType.fieldCredit
        ? (control.value.credit || 0) * currencyValue
        : 0;
    });
    this.sumCredit.set(totalCredit);
    this.sumDebit.set(totalDebit);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.sumDebit() == 0 && this.sumCredit() == 0) {
      alert('enter some journal items');
      return;
    }
    let data: CreateJournalRequest = {
      date: this.form.controls.date.value,
      branchId: this.form.controls.branchId.value!,
      currencyId: this.form.controls.currencyId.value,
      currencyValue: this.form.controls.currencyValue.value!,
      parentType: this.journalType.id,
      isPosted: this.form.controls.isPosted.value,
      journalItems:
        this.form.controls.journalItems.value.map<CreateJournalItemRequest>(
          (e) => ({
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
          })
        ),
    };
    if (this.journalType.defaultAccountId && this.minus() != 0) {
      let newJournalItems = data.journalItems.map<CreateJournalItemRequest>(
        (e) => {
          if (e.accountId == this.form.controls.account.value) {
            return {
              ...e,
              debit:
                this.minus() > 0
                  ? 0
                  : Math.abs(this.minus()) /
                    this.form.controls.currencyValue.value,
              credit:
                this.minus() > 0
                  ? Math.abs(this.minus()) /
                    this.form.controls.currencyValue.value
                  : 0,
            };
          } else {
            return e;
          }
        }
      );

      data = { ...data, journalItems: newJournalItems };
      // data.journalItems.push({
      //   accountId: this.journalType.defaultAccountId.id,
      //   notes: undefined,
      //   debit:
      //     this.minus() > 0
      //       ? 0
      //       : Math.abs(this.minus()) / this.form.controls.currencyValue.value,
      //   credit:
      //     this.minus() > 0
      //       ? Math.abs(this.minus()) / this.form.controls.currencyValue.value
      //       : 0,
      // });
    }
    this.journalService.updateJournal(data, this.journalId).subscribe({
      next: (_) => this.location.back(),
      error: (err) => console.error(err),
    });
  }

  addRow(e: any | undefined) {
    this.journalItems.push(this.createItemRow(e));
  }

  removeRow(i: number) {
    this.journalItems.removeAt(i);
    this.calculateSum();
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
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
  get branchOptions() {
    return this.branches.map((b) => ({ key: b.id, value: b.name }));
  }
}
