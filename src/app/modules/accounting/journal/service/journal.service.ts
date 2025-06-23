import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CreateJournalRequest } from '../models/request/create-journal-request.model';
import { JournalResponse } from '../models/reponse/journal-response.model';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/journals`;

  createJournal(object: CreateJournalRequest): Observable<JournalResponse> {
    return this.http.post<JournalResponse>(this.apiUrl, object);
  }

  updateJournal(
    object: CreateJournalRequest,
    id: number
  ): Observable<JournalResponse> {
    return this.http.put<JournalResponse>(this.apiUrl + `/${id}`, object);
  }

  getJournals(parentType?: number): Observable<JournalResponse[]> {
    const option = parentType
      ? {
          params: { parentType: parentType?.toString() },
        }
      : undefined;
    const url = parentType ? `${this.apiUrl}/search` : `${this.apiUrl}`;
    return this.http.get<JournalResponse[]>(url, option);
  }

  getJournalsById(id: number): Observable<JournalResponse> {
    return this.http.get<JournalResponse>(`${this.apiUrl}/${id}`);
  }

  deleteJournal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
