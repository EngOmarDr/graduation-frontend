import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StatisticsDashboardResponse } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/statistics/dashboard`;
  private http = inject(HttpClient);

  getStatistics(startDate: string, endDate: string): Observable<StatisticsDashboardResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<StatisticsDashboardResponse>(
      `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`,
      { headers }
    );
  }
}
