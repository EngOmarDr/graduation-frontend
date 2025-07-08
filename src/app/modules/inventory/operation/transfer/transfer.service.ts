import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TransferResponse } from './models/response/transfer-response';
import { TransferRequest } from './models/request/transfer-request';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = `${environment.apiUrl}/transfer`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<TransferResponse[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<TransferResponse>(`${this.apiUrl}/${id}`);
  }

  create(object: TransferRequest) {
    return this.http.post<TransferResponse>(this.apiUrl, object);
  }

  update(id: number, object: TransferRequest) {
    return this.http.put<TransferResponse>(`${this.apiUrl}/${id}`, object);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
