import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ItemMovementResponse } from '../models/response/item-movement-response';
import { DailyMovementResponse } from '../models/response/daily-movement-response';
import { StockReportResponse } from '../models/response/stock-report-response';
import { InventoryReportRequest } from '../models/request/inventory-report-request';

@Injectable({
  providedIn: 'root',
})
export class InventoryReportsService {
  private readonly apiUrl = `${environment.apiUrl}/invoices`;
  private readonly http = inject(HttpClient);

  itemMovementReport(request: InventoryReportRequest) {
    let params = new HttpParams({
      fromObject: {
        startDate: request.startDate,
        endDate: request.endDate,
        productId: request.productId ?? '',
        groupId: request.groupId ?? '',
        warehouseId: request.warehouseId ?? '',
      },
    });
    return this.http.get<ItemMovementResponse[]>(
      this.apiUrl + '/material-movement-report',
      { params }
    );
  }

  dailyMovementReport(request: InventoryReportRequest) {
    let params = new HttpParams({
      fromObject: {
        startDate: request.startDate,
        endDate: request.endDate,
        productId: request.productId ?? '',
        groupId: request.groupId ?? '',
        warehouseId: request.warehouseId ?? '',
      },
    });
    return this.http.get<DailyMovementResponse>(
      this.apiUrl + '/daily-movement-report',
      { params }
    );
  }

  stockReport(request: InventoryReportRequest) {
    const params = new HttpParams({
      fromObject: {
        startDate: request.startDate,
        endDate: request.endDate,
        productId: request.productId ?? '',
        groupId: request.groupId ?? '',
        warehouseId: request.warehouseId ?? '',
      },
    });
    return this.http.get<StockReportResponse>(
      this.apiUrl + '/product-stock-report',
      { params }
    );
  }
}
