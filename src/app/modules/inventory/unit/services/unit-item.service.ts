import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitItem } from '../models/unit-item.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnitItemService {
  private apiUrl = `${environment.apiUrl}/unit-items`;

  constructor(private http: HttpClient) {}

  getUnitItems(): Observable<UnitItem[]> {
    return this.http.get<UnitItem[]>(this.apiUrl);
  }

  getUnitItemById(id: number): Observable<UnitItem> {
    return this.http.get<UnitItem>(`${this.apiUrl}/${id}`);
  }

  getItemsByUnitId(unitId: number): Observable<UnitItem[]> {
    return this.http.get<UnitItem[]>(`${this.apiUrl}?unitId=${unitId}`);
  }

  createUnitItem(unitItem: Partial<UnitItem>): Observable<UnitItem> {
    return this.http.post<UnitItem>(this.apiUrl, unitItem);
  }

  updateUnitItem(id: number, unitItem: Partial<UnitItem>): Observable<UnitItem> {
    return this.http.put<UnitItem>(`${this.apiUrl}/${id}`, unitItem);
  }

  deleteUnitItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
