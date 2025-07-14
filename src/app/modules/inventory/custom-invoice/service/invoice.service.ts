import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { InvoiceResponse } from '../models/response/invoice-response';
import { InvoiceRequest } from '../models/request/invoice-request';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly apiUrl = `${environment.apiUrl}/invoices`;
  private readonly http = inject(HttpClient);

  getAll(id?: number) {
    return this.http.get<InvoiceResponse[]>(
      this.apiUrl + `/search-by-invoice-type-id?id=${id}`
    );
  }

  getById(id: number) {
    return this.http.get<InvoiceResponse>(`${this.apiUrl}/${id}`);
  }

  create(object: InvoiceRequest) {
    return this.http.post<InvoiceResponse>(this.apiUrl, object);
  }

  update(id: number, Invoice: InvoiceRequest) {
    return this.http.put<InvoiceResponse>(`${this.apiUrl}/${id}`, Invoice);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
