import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
import { InvoiceTypeResponse } from '../models/response/invoice-type-response';
import { InvoiceTypeRequest } from '../models/request/invoice-type-request';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTypeService {
  private readonly apiUrl = `${environment.apiUrl}/invoice-types`;
  private readonly http = inject(HttpClient);

  invoiceTypes = signal<InvoiceTypeResponse[]>([]);

  constructor() {
    // Auto-load when the service initializes
    this.getInvoiceTypes().subscribe();
  }

  getInvoiceTypes(): Observable<InvoiceTypeResponse[]> {
    return this.http.get<InvoiceTypeResponse[]>(this.apiUrl).pipe(
      tap((invoiceTypes) => {
        this.invoiceTypes.set(invoiceTypes);
      })
    );
  }

  getById(id: number): Observable<InvoiceTypeResponse> {
    return this.http.get<InvoiceTypeResponse>(`${this.apiUrl}/${id}`);
  }

  create(object: InvoiceTypeRequest) {
    return this.http.post<InvoiceTypeResponse>(this.apiUrl, object).pipe(
      tap((newInvoiceType) => {
        this.invoiceTypes.update((types) => [...types, newInvoiceType]);
      })
    );
  }

  update(
    id: number,
    InvoiceType: InvoiceTypeRequest
  ): Observable<InvoiceTypeResponse> {
    return this.http
      .put<InvoiceTypeResponse>(`${this.apiUrl}/${id}`, InvoiceType)
      .pipe(
        tap((updatedInvoiceType) => {
          this.invoiceTypes.update((types) =>
            types.map((jt) => (jt.id === id ? updatedInvoiceType : jt))
          );
        })
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.invoiceTypes.update((types) => types.filter((jt) => jt.id !== id));
      })
    );
  }
}
