import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AdvertisementResponse } from '../models/advertisement-response';

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  private apiUrl = `${environment.apiUrl}/advertisements`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<AdvertisementResponse[]>(this.apiUrl);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // يمكنك لاحقًا إضافة:
  // create(data: any, file: File) { ... }
  // update(...) { ... }
}
