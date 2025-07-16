import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementResponse } from '../models/advertisement-response';

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AdvertisementResponse[]> {
    return this.http.get<AdvertisementResponse[]>('/api/ads');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/ads/${id}`);
  }
}
