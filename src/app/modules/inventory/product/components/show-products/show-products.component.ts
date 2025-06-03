import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomTableComponent } from '@shared/components/cust-table.component';
import { ProductResponse } from '../../models/response/product-response';

@Component({
  selector: 'app-show-products',
  imports: [CardComponent, RouterModule, CommonModule, CustomTableComponent],
  templateUrl: './show-products.component.html',
})
export class ShowProductsComponent {
  readonly router = inject(Router);

  displayedColumns: (keyof ProductResponse)[] = [
    'id',
    'name',
    'code',
    'groupName',
    'unitName',
  ];

  products$ = new Observable<ProductResponse[]>();

  updateProduct(product: ProductResponse | number) {}

  deleteProduct(product: ProductResponse | number) {}
}
