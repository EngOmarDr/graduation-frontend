import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Price } from '../models/price';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiUrl = `${environment.apiUrl}/prices`;
  private http = inject(HttpClient);

  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl);
  }

  getPriceById(id: number | string): Observable<Price> {
    return this.http.get<Price>(`${this.apiUrl}/${id}`);
  }

  createPrice(price: Partial<Price>) {
    return this.http.post<Price>(this.apiUrl, price);
  }

  updatePrice(id: number | string, price: Partial<Price>): Observable<Price> {
    return this.http.put<Price>(`${this.apiUrl}/${id}`, price);
  }

  deletePrice(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
