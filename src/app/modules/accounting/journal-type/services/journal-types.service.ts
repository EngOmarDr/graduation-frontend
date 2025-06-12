import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { JournalTypeResponse } from '../models/response/journal-type-response.model';
import { Observable } from 'rxjs';
import { JournalTypeRequest } from '../models/request/journal-type-request.model';

@Injectable({
  providedIn: 'root',
})
export class JournalTypesService {
  private apiUrl = `${environment.apiUrl}/journalTypes`;

  private http = inject(HttpClient);

  getJournalTypes(): Observable<JournalTypeResponse[]> {
    return this.http.get<JournalTypeResponse[]>(this.apiUrl);
  }

  getJournalTypeById(id: number): Observable<JournalTypeResponse> {
    return this.http.get<JournalTypeResponse>(`${this.apiUrl}/${id}`);
  }

  createJournalType(object: JournalTypeRequest) {
    return this.http.post<JournalTypeResponse>(this.apiUrl, object);
  }

  updateJournalType(
    id: number,
    JournalType: JournalTypeRequest
  ): Observable<JournalTypeResponse> {
    return this.http.put<JournalTypeResponse>(
      `${this.apiUrl}/${id}`,
      JournalType
    );
  }

  deleteJournalType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
