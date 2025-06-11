import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CreateJournalRequest } from '../../journal/models/create-journal-request.model';

@Injectable({ providedIn: 'root' })
export class CustomJournalService {
  private apiUrl = `${environment.apiUrl}/journals`;
  private http = inject(HttpClient);


  createJournal(journal: CreateJournalRequest) {
    return this.http.post<any>(this.apiUrl, journal);
  }


}
