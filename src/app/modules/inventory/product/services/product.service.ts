import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { ProductResponse } from '../models/response/product-response';
import { ProductRequest } from '../models/request/product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl);
  }

  getProductById(id: number | string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  search(search:string){
    return this.http.get<ProductResponse[]>(`${this.apiUrl}/search?q=${search}`);
  }

  createProduct(object: ProductRequest) {
    const formData = new FormData();

    formData.append('code', object.code);
    formData.append('name', object.name);
    formData.append('type', object.type.toString());
    formData.append('groupId', object.groupId.toString());
    formData.append('defaultUnitId', object.defaultUnitId.toString());
    if (object.minQty) formData.append('minQty', object.minQty.toString());
    if (object.maxQty) formData.append('maxQty', object.maxQty.toString());
    if (object.orderQty) formData.append('orderQty', `${object.orderQty}`);
    if (object.image) formData.append('image', object.image);
    if (object.notes) formData.append('notes', object.notes?.toString());

    object.prices.forEach((item, index) => {
      formData.append(`prices[${index}].price`, item.price.toString());
      formData.append(`prices[${index}].priceId`, item.priceId.toString());
      formData.append(
        `prices[${index}].unitItemId`,
        item.unitItemId.toString()
      );
    });
    object.barcodes.forEach((item, index) => {
      formData.append(`barcodes[${index}].barcode`, item.barcode);
      formData.append(
        `barcodes[${index}].unitItemId`,
        item.unitItemId.toString()
      );
    });
    return this.http.post<ProductResponse>(this.apiUrl, formData, {
      headers: { ContentType: 'multipart/form-data' },
    });
  }

  updateProduct(
    id: number | string,
    object: ProductRequest
  ): Observable<ProductResponse> {
    const formData = new FormData();

    formData.append('code', object.code);
    formData.append('name', object.name);
    formData.append('type', object.type.toString());
    formData.append('groupId', object.groupId.toString());
    formData.append('defaultUnitId', object.defaultUnitId.toString());
    if (object.minQty) formData.append('minQty', object.minQty.toString());
    if (object.maxQty) formData.append('maxQty', object.maxQty.toString());
    if (object.orderQty) formData.append('orderQty', `${object.orderQty}`);
    if (object.image) formData.append('image', object.image);
    if (object.notes) formData.append('notes', object.notes?.toString());

    object.prices.forEach((item, index) => {
      formData.append(`prices[${index}].price`, item.price.toString());
      formData.append(`prices[${index}].priceId`, item.priceId.toString());
      formData.append(
        `prices[${index}].unitItemId`,
        item.unitItemId.toString()
      );
    });
    object.barcodes.forEach((item, index) => {
      formData.append(`barcodes[${index}].barcode`, item.barcode);
      formData.append(
        `barcodes[${index}].unitItemId`,
        item.unitItemId.toString()
      );
    });
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, formData, {
      headers: { ContentType: 'multipart/form-data' },
    });
  }

  deleteProduct(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
