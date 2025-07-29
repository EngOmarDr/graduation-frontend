import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JournalTypesService } from '../../services/journal-types.service';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { Observable, of } from 'rxjs';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '@shared/components/card-form.component';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-add-journalType',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    TranslateModule,
  ],
  templateUrl: './add-journal-type.component.html',
})
export class AddJournalTypeComponent {
  constructor(private alert: AlertService) {}
  private fb = inject(NonNullableFormBuilder);
  private service = inject(JournalTypesService);
  private accountService = inject(AccountService);
  private currencyService = inject(CurrencyService);

  form = this.fb.group({
    name: ['', Validators.required],
    autoPost: [false],
    fieldDebit: [false],
    fieldCredit: [false],
    fieldNotes: [false],
    fieldCurrencyName: [false],
    fieldCurrencyEquilty: [false],
    defaultCurrencyId: [],
    fieldDate: [false],
    numberFormat: [''],
    debitName: [''],
    creditName: [''],
    defaultAccountId: [],
  });

  accounts$: Observable<AccountResponse[]> = of();
  currencies$: Observable<Currency[]> = of();

  ngOnInit(): void {
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
    this.service.createJournalType(this.form.getRawValue()).subscribe({
      next: () => {
        this.alert.showSuccess('added');
        this.form.reset();
      },
    });
  }
}
