import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { JournalTypeResponse } from '../models/response/journal-type-response.model';
import { Observable, tap } from 'rxjs';
import { JournalTypeRequest } from '../models/request/journal-type-request.model';

@Injectable({
  providedIn: 'root',
})
export class JournalTypesService {
  private readonly apiUrl = `${environment.apiUrl}/journalTypes`;
  private readonly http = inject(HttpClient);

  private readonly _journalTypes = signal<JournalTypeResponse[]>([]);
  get journalTypes() {
    return this._journalTypes;
  }

  constructor() {
    // Auto-load journal types when the service initializes
    this.getJournalTypes().subscribe();
  }

  getJournalTypes(): Observable<JournalTypeResponse[]> {
    return this.http.get<JournalTypeResponse[]>(this.apiUrl).pipe(
      tap((journalTypes) => {
        this._journalTypes.set(journalTypes);
      })
    );
  }

  getJournalTypeById(id: number): Observable<JournalTypeResponse> {
    return this.http.get<JournalTypeResponse>(`${this.apiUrl}/${id}`);
  }

  createJournalType(object: JournalTypeRequest) {
    return this.http.post<JournalTypeResponse>(this.apiUrl, object).pipe(
      tap((newJournalType) => {
        this._journalTypes.update((types) => [...types, newJournalType]);
      })
    );
  }

  updateJournalType(
    id: number,
    JournalType: JournalTypeRequest
  ): Observable<JournalTypeResponse> {
    return this.http
      .put<JournalTypeResponse>(`${this.apiUrl}/${id}`, JournalType)
      .pipe(
        tap((updatedJournalType) => {
          this._journalTypes.update((types) =>
            types.map((jt) => (jt.id === id ? updatedJournalType : jt))
          );
        })
      );
  }

  deleteJournalType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._journalTypes.update((types) =>
          types.filter((jt) => jt.id !== id)
        );
      })
    );
  }
}
