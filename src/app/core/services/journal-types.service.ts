import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { JournalTypesResponse } from '../models/response/journal-types-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalTypesService {
  private apiUrl = `${environment.apiUrl}/journalTypes`;

  private http = inject(HttpClient);

  getJournalTypes(): Observable<JournalTypesResponse[]> {
    return this.http.get<JournalTypesResponse[]>(this.apiUrl);
  }
}
