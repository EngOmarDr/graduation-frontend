import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { GeneralJournalReport } from '../models/general-journal-report';
import { Observable } from 'rxjs';
import { LedgerReport } from '../models/ledger-report';
import { TrialBalanceReport } from '../models/trial-balance-report';

@Injectable({
  providedIn: 'root',
})
export class AccountingReportsService {
  private readonly apiUrl = `${environment.apiUrl}/journals`;
  private readonly http = inject(HttpClient);

  getGeneralJournalReport(
    startDate: string,
    endDate: string
  ): Observable<GeneralJournalReport[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<GeneralJournalReport[]>(
      this.apiUrl + '/general-journal-report',
      { params }
    );
  }

  getJournalLedgerReport(
    startDate: string,
    endDate: string,
    accountId: number
  ): Observable<LedgerReport> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('accountId', accountId);
    return this.http.get<LedgerReport>(this.apiUrl + '/ledger-report', {
      params,
    });
  }

  getTrialBalanceReport(
    startDate: string,
    endDate: string,
  ): Observable<TrialBalanceReport> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
      params = new HttpParams()
        .set('date', endDate);
    return this.http.get<TrialBalanceReport>(
      this.apiUrl + '/trial-balance-report',
      { params }
    );
  }
}
