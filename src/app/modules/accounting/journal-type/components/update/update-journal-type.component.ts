import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { ActivatedRoute } from '@angular/router';
import { JournalTypeResponse } from '../../models/response/journal-type-response.model';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { JournalTypesService } from '../../services/journal-types.service';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-update-journalType',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    TranslateModule
  ],
  templateUrl: './update-journal-type.component.html',
})
export class UpdateJournalTypeComponent {
  constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(JournalTypesService);
  private readonly accountService = inject(AccountService);
  private readonly currencyService = inject(CurrencyService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  journalType: JournalTypeResponse | undefined;
  journalTypeId!: number;

  form = this.fb.group({
    name: ['', Validators.required],
    autoPost: [false],
    fieldDebit: [false],
    fieldCredit: [false],
    fieldNotes: [false],
    fieldCurrencyName: [false],
    fieldCurrencyEquilty: [false],
    defaultCurrencyId: this.fb.control<number | undefined>(undefined),
    fieldDate: [false],
    numberFormat: [''],
    debitName: [''],
    creditName: [''],
    defaultAccountId: this.fb.control<number | undefined>(undefined),
  });

  accounts$: Observable<AccountResponse[]> = of();
  currencies$: Observable<Currency[]> = of();

  ngOnInit(): void {
    const navigation = window.history.state;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id == null) {
      this.location.back();
    } else {
      this.journalTypeId = Number.parseInt(id);
      if (navigation.account) {
        const next = navigation.account as JournalTypeResponse;
        this.form = this.fb.group({
          name: [next.name, Validators.required],
          autoPost: [next.autoPost],
          fieldDebit: [next.fieldDebit],
          fieldCredit: [next.fieldCredit],
          fieldNotes: [next.fieldNotes],
          fieldCurrencyName: [next.fieldCurrencyName],
          fieldCurrencyEquilty: [next.fieldCurrencyEquilty],
          defaultCurrencyId: this.fb.control<number | undefined>(
            next.defaultCurrency?.id
          ),
          fieldDate: [next.fieldDate],
          numberFormat: [next.numberFormat],
          debitName: [next.debitName],
          creditName: [next.creditName],
          defaultAccountId: this.fb.control<number | undefined>(
            next.defaultAccountId?.id
          ),
        });
      } else {
        this.service.getJournalTypeById(this.journalTypeId!).subscribe({
          next: (next) => {
            this.form = this.fb.group({
              name: [next.name, Validators.required],
              autoPost: [next.autoPost],
              fieldDebit: [next.fieldDebit],
              fieldCredit: [next.fieldCredit],
              fieldNotes: [next.fieldNotes],
              fieldCurrencyName: [next.fieldCurrencyName],
              fieldCurrencyEquilty: [next.fieldCurrencyEquilty],
              defaultCurrencyId: this.fb.control<number | undefined>(
                next.defaultCurrency?.id
              ),
              fieldDate: [next.fieldDate],
              numberFormat: [next.numberFormat],
              debitName: [next.debitName],
              creditName: [next.creditName],
              defaultAccountId: this.fb.control<number | undefined>(
                next.defaultAccountId?.id
              ),
            });
          },
          error: () => {
            this.location.back();
          },
        });
      }
    }
    this.accounts$ = this.accountService.getAccounts();
    this.currencies$ = this.currencyService.getCurrencies();
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.service
      .updateJournalType(this.journalTypeId, this.form.getRawValue())
      .subscribe({
        next: (n) => {
          this.alert.showSuccess('updated');
          this.location.back();
        },
      });
  }
}
