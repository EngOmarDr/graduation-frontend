import { Component, inject, linkedSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { ProductResponse } from '../../models/response/product-response';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-products',
  imports: [
    CardComponent,
    RouterModule,
    CommonModule,
    NgOptimizedImage,
    SweetAlert2Module,
    TranslateModule
  ],
  templateUrl: './show-products.component.html',
})
export class ShowProductsComponent {
  constructor(private alert: AlertService) {}
  private readonly router = inject(Router);
  private readonly service = inject(ProductService);

  productsReadonly = toSignal(this.service.getProducts(), { initialValue: [] });
  products = linkedSignal(() => this.productsReadonly());
  displayColumns = ['code', 'name', 'image'];

  updateProduct(object: ProductResponse) {
    this.router.navigate(['update-product', object.id], {
      state: { object },
    });
  }

  deleteProduct(object: ProductResponse) {
    this.service.deleteProduct(object.id).subscribe(() => {
      this.products.update((old) => old.filter((e) => e.id !== object.id));
    });
    this.alert.showSuccess('deleted');
  }
}
