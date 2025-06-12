import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { UnitRequest } from '../models/request/unit-request.model';
import { UnitResponse } from '../models/response/unit-response.model';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private apiUrl = `${environment.apiUrl}/units`;
  private readonly http = inject(HttpClient);

  getUnits(): Observable<UnitResponse[]> {
    return this.http.get<UnitResponse[]>(this.apiUrl);
  }

  getUnitById(id: number): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(`${this.apiUrl}/${id}`);
  }

  createUnit(unit: UnitRequest): Observable<UnitResponse> {
    return this.http.post<UnitResponse>(this.apiUrl, unit);
  }

  updateUnit(id: number, unit: UnitRequest): Observable<UnitResponse> {
    return this.http.put<UnitResponse>(`${this.apiUrl}/${id}`, unit);
  }

  deleteUnit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
