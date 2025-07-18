import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventoryCountResponse } from '../models/inventory-count-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  private readonly http = inject(HttpClient);

  getInventoryItems(request: {
    warehouseId: number | null;
    groupId: number | null;
    productId: number | null;
  }) {
    let params = new HttpParams({
      fromObject: {
        productId: request.productId ?? '',
        groupId: request.groupId ?? '',
      },
    });
    return this.http.get<InventoryCountResponse>(
      `${environment.apiUrl}/warehouses/${request.warehouseId}/stock`,
      { params }
    );
  }

  // getDraftCount(): Observable<InventoryCount> {
  //   return this.http.get<InventoryCount>(`${this.apiUrl}/draft`);
  // }

  // saveCount(count: InventoryCount): Observable<InventoryCount> {
  //   return this.http.post<InventoryCount>(this.apiUrl, count);
  // }

  // createNewCount(): InventoryCount {
  //   return {
  //     id: null,
  //     countDate: new Date(),
  //     items: [],
  //     isDraft: true,
  //     createdBy: 'currentUser',
  //   };
  // }

  // importCountFromFile(file: File): Promise<InventoryItem[]> {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e: any) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  //       const items = XLSX.utils.sheet_to_json<InventoryItem>(firstSheet);
  //       resolve(items);
  //     };
  //     fileReader.readAsArrayBuffer(file);
  //   });
  // }

  // exportToExcel(count: InventoryCount): void {
  //   const worksheet = XLSX.utils.json_to_sheet(count.items);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'سند الجرد');
  //   XLSX.writeFile(workbook, `سند_الجرد_${new Date().toISOString()}.xlsx`);
  // }

  // calculateDifferences(count: InventoryCount): void {
  //   count.items.forEach((item) => {
  //     item.quantityDifference = item.countedQuantity - item.currentQuantity;
  //     item.costDifference = item.quantityDifference * item.unitCost;
  //   });
  // }

  // getCategories(): string[] {
  //   // في التطبيق الحقيقي، سيتم جلب هذا من الخلفية
  //   return ['الكهربائيات', 'الأثاث', 'المواد الغذائية', 'الأدوات المكتبية'];
  // }
}
