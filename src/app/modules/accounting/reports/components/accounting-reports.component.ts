import { Component, inject, signal } from '@angular/core';

import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { AccountingReportsService } from '../services/accounting-reports.service';
import { AccountingReportsKeys } from 'app/core/constants/constant';
import { AccountResponse } from '../../account/models/response/account-response.model';
import { AccountService } from '../../account/service/account-service.service';
import { AcccountSearchModalComponent } from '../../account/components/acccount-search-modal/acccount-search-modal.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { GeneralJournalReport } from '../models/general-journal-report';
import { LedgerReport } from '../models/ledger-report';
import { TrialBalanceReport } from '../models/trial-balance-report';

@Component({
  selector: 'app-accounting-report',
  templateUrl: './accounting-reports.component.html',
  imports: [
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    AcccountSearchModalComponent,
    ValidationMessageComponent,
    CommonModule,
  ],
})
export class AccountingReportsComponent {
  private readonly service = inject(AccountingReportsService);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);

  typeReport!: string;
  form!: FormGroup;

  generalJournal?: GeneralJournalReport[];
  ledger?: LedgerReport;
  trailBalance?: TrialBalanceReport;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.generalJournal = undefined;
      this.ledger = undefined;
      this.trailBalance = undefined;
      this.typeReport = params['name'];
      if (params['name'] == AccountingReportsKeys.LEDGER) {
        this.form = this.fb.group({
          accountId: ['', [Validators.required]],
          accountName: ['', [Validators.required]],
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
        });
      } else {
        this.form = this.fb.group({
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]],
        });
      }
    });
  }

  onSubmit() {
    if (this.typeReport == AccountingReportsKeys.LEDGER) {
      this.service
        .getJournalLedgerReport(
          this.form.get('startDate')?.value,
          this.form.get('endDate')?.value,
          this.form.get('accountId')?.value
        )
        .subscribe((e) => {
          this.ledger = e;
        });
    } else if (this.typeReport == AccountingReportsKeys.GENERALJOURNAL) {
      this.service
        .getGeneralJournalReport(
          this.form.get('startDate')?.value,
          this.form.get('endDate')?.value
        )
        .subscribe((e) => {
          this.generalJournal = e;
        });
    } else {
      this.service
        .getTrialBalanceReport(
          this.form.get('startDate')?.value,
          this.form.get('endDate')?.value
        )
        .subscribe((e) => {
          this.trailBalance = e;
        });
    }
  }

  printReport(): void {
    const printContents = document.getElementById('report')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }

  // get firstDayInYear() {
  //   let year = new Date().getUTCFullYear();
  //   return new Date(year).toISOString().split('T')[0];
  // }

  // search account card
  private readonly accountService = inject(AccountService);
  isLoadingAccounts = signal(false);
  showModalAccount = false;
  accounts: AccountResponse[] = [];
  onAccountSelected(object: any) {
    this.form.get('accountName')!.setValue(object.code + ' - ' + object.name);
    this.form.get('accountId')!.setValue(object.id);
  }

  submitAccountSearch() {
    if (
      (this.form.get('accountName')!.value?.toString().trim().length ?? 0) == 0
    ) {
      this.toastr.info('enter value to search');
      return;
    }
    this.isLoadingAccounts.set(true);

    this.accountService
      .searchAccount(this.form.get('accountName')!.value?.toString())
      .subscribe({
        next: (next) => {
          this.accounts = next;
          this.isLoadingAccounts.set(false);
          if (next.length == 1) {
            this.form
              .get('accountName')!
              .setValue(next[0].code + ' - ' + next[0].name);
            this.form.get('accountId')!.setValue(next[0].id);
          } else {
            this.showModalAccount = true;
          }
        },
        error: () => {
          this.isLoadingAccounts.set(false);
        },
      });
  }
}
