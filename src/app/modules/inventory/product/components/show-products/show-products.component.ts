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
  productsRaw = linkedSignal(() => this.productsReadonly());

  displayColumns = ['code', 'name', 'image'];

  page = 1;
  perPage = 10;

  get totalPages(): number {
    return Math.ceil(this.productsRaw().length / this.perPage);
  }

  products() {
    const start = (this.page - 1) * this.perPage;
    return this.productsRaw().slice(start, start + this.perPage);
  }

  updateProduct(object: ProductResponse) {
    this.router.navigate(['update-product', object.id], {
      state: { object },
    });
  }

  deleteProduct(object: ProductResponse) {
    this.service.deleteProduct(object.id).subscribe(() => {
      this.productsRaw.update((old) => old.filter((e) => e.id !== object.id));
      if (this.page > this.totalPages) {
        this.page = this.totalPages || 1;
      }
    });
    this.alert.showSuccess('deleted');
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    this.alert.showWarning('messages.no_file_selected');
    return;
  }

  const file = input.files[0];
  const formData = new FormData();
  formData.append('file', file);

  this.service.importFromExcel(formData).subscribe({
    next: (res) => {
      this.alert.showSuccess('added');
      this.refreshProducts();
    },
    error: () => {
      this.alert.showError('messages.import_failed');
    },
  });

  input.value = '';
}

refreshProducts() {
  this.service.getProducts().subscribe((data) => {
    this.productsRaw.set(data);
  });
}

}
