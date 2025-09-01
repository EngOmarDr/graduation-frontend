import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SyncResponse } from '../model/sync.model';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private apiUrl = `${environment.apiUrl}/`;
  private http = inject(HttpClient);

  getSync() {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });

    return this.http.get<SyncResponse>(`${this.apiUrl}?`);
  }
}
