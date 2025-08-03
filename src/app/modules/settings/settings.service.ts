import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SettingsResponse } from './models/response/settings-response.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = `${environment.apiUrl}/invoice-pos`;
  private http = inject(HttpClient);

  get() {
    return this.http.get<SettingsResponse[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<SettingsResponse>(`${this.apiUrl}/${id}`);
  }

  create(invoiceTypeId: number) {
    return this.http.post<SettingsResponse>(this.apiUrl, {invoiceTypeId});
  }

  update(id: number, invoiceTypeId: number) {
    return this.http.put<SettingsResponse>(`${this.apiUrl}/${id}`, {invoiceTypeId});
  }

  // delete(id: number) {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
