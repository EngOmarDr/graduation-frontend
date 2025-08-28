import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PurchaseResponse } from './models/response/purchase-response';
import { PurchaseRequest } from './models/request/purchase-request';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl = `${environment.apiUrl}/purchases`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<PurchaseResponse[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<PurchaseResponse>(`${this.apiUrl}/${id}`);
  }

  create(object: PurchaseRequest) {
    return this.http.post<PurchaseResponse>(this.apiUrl, object);
  }

  update(id: number, object: PurchaseRequest) {
    return this.http.put<PurchaseResponse>(`${this.apiUrl}/${id}`, object);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
