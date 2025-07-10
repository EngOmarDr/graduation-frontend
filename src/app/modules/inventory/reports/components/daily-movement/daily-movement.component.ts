import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { ActivatedRoute } from '@angular/router';
import { AccountingReportsService } from 'app/modules/accounting/reports/services/accounting-reports.service';
import { GeneralJournalReport } from 'app/modules/accounting/reports/models/general-journal-report';
import { LedgerReport } from 'app/modules/accounting/reports/models/ledger-report';
import { TrialBalanceReport } from 'app/modules/accounting/reports/models/trial-balance-report';
import { AccountingReportsKeys } from 'app/core/constants/constant';
import { ProductSearchComponent } from "../../../product/components/search-product/search-product.component";

@Component({
  selector: 'app-daily-movement',
  imports: [CardComponent, ReactiveFormsModule, CustomFieldComponent, ProductSearchComponent],
  templateUrl: './daily-movement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyMovementComponent {
  private readonly service = inject(AccountingReportsService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);

  typeReport!: string;
  form = this.fb.group({
    productId: ['', [Validators.required]],
    groupId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  generalJournal?: GeneralJournalReport[];
  ledger?: LedgerReport;
  trailBalance?: TrialBalanceReport;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.generalJournal = undefined;
      this.ledger = undefined;
      this.trailBalance = undefined;
      this.typeReport = params['name'];
      // if (params['name'] == AccountingReportsKeys.LEDGER) {
      //   this.form = this.fb.group({
      //     accountId: ['', [Validators.required]],
      //     accountName: ['', [Validators.required]],
      //     startDate: ['', [Validators.required]],
      //     endDate: ['', [Validators.required]],
      //   });
      // } else {
      //   this.form = this.fb.group({
      //     startDate: ['', [Validators.required]],
      //     endDate: ['', [Validators.required]],
      //   });
      // }
    });
  }

  onSubmit() {
    if (this.typeReport == AccountingReportsKeys.LEDGER) {
      // this.service
      //   .getJournalLedgerReport(
      //     this.form.get('startDate')!.value,
      //     this.form.get('endDate')!.value,
      //     this.form.get('accountId')?.value
      //   )
      //   .subscribe((e) => {
      //     this.ledger = e;
      //   });
    } else if (this.typeReport == AccountingReportsKeys.GENERALJOURNAL) {
      // this.service
      //   .getGeneralJournalReport(
      //     this.form.get('startDate')?.value,
      //     this.form.get('endDate')?.value
      //   )
      //   .subscribe((e) => {
      //     this.generalJournal = e;
      //   });
    } else {
      // this.service
      //   .getTrialBalanceReport(
      //     this.form.get('startDate')?.value,
      //     this.form.get('endDate')?.value
      //   )
      //   .subscribe((e) => {
      //     this.trailBalance = e;
      //   });
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

}
