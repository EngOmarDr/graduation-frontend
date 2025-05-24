import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiUrl = `${environment.apiUrl}/currencies`;

  constructor(private http: HttpClient) {}

    getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.apiUrl}/${id}`);
  }

  createCurrency(currency: Partial<Currency>) {
    return this.http.post<Currency>(this.apiUrl, currency);
  }

  updateCurrency(id: number, currency: Currency): Observable<Currency> {
  return this.http.put<Currency>(`${this.apiUrl}/${id}`, currency);
  }

  deleteCurrency(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
