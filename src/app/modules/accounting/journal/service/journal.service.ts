

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {
  JournalRequest,
  CreateJournalResponse,
  Voucher
} from '../models/journal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/journals`;

  createJournal(data: JournalRequest): Observable<CreateJournalResponse> {
    return this.http.post<CreateJournalResponse>(this.apiUrl, data);
  }

  getJournals(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.apiUrl}`);
  }

  deleteJournal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
