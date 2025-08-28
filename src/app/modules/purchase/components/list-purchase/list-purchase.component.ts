import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '@shared/components/card-form.component';
import { PurchaseService } from '../../purchase.service';
import { PurchaseResponse } from '../../models/response/purchase-response';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-list-purchase',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    CommonModule,
    SweetAlert2Module,
    TranslateModule
  ],
  templateUrl: './list-purchase.component.html',
})
export class ListPurchaseComponent {
  private readonly service = inject(PurchaseService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly purchases = signal<PurchaseResponse[]>([]);

  constructor() {
    this.service.getAll().subscribe((data) => {
      this.purchases.set(data);
    });
  }

  update(row: PurchaseResponse) {
    this.router.navigate(['/purchases/edit', row.id]);
  }

  delete(row: PurchaseResponse) {
    this.service.delete(row.id).subscribe(() => {
      this.purchases.update((old) => old.filter((e) => e.id !== row.id));
      this.alert.showSuccess('deleted');
    });
  }
}
