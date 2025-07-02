import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { WarehouseResponse } from '../models/response/warehouse-response';
import { WarehouseRequest } from '../models/request/warehouse-request';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private apiUrl = `${environment.apiUrl}/warehouses`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<WarehouseResponse[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<WarehouseResponse>(`${this.apiUrl}/${id}`);
  }

  create(object: WarehouseRequest) {
    return this.http.post<WarehouseResponse>(this.apiUrl, object);
  }

  update(id: number, object: WarehouseRequest) {
    return this.http.put<WarehouseResponse>(`${this.apiUrl}/${id}`, object);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
