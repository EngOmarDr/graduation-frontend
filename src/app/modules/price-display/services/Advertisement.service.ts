import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AdvertisementResponse } from '../models/advertisement-response';
import { Observable } from 'rxjs';

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

  create(data: { name: string; duration: number; type: string }, file: File): Observable<AdvertisementResponse> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('duration', data.duration.toString());
    formData.append('mediaUrl', file, file.name);

    return this.http.post<AdvertisementResponse>(this.apiUrl, formData
    );
  }

  update(id: number, data: { name: string; duration: number; type: string }, file?: File) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('duration', data.duration.toString());
  formData.append('type', data.type);

  if (file) {
    formData.append('mediaUrl', file);
  }

  return this.http.put<AdvertisementResponse>(`${this.apiUrl}/${id}`, formData);
}

getById(id: number) {
  return this.http.get<AdvertisementResponse>(`${this.apiUrl}/${id}`);
}
}
