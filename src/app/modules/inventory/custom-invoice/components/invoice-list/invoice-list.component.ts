import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../service/invoice.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InvoiceResponse } from '../../models/response/invoice-response';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';
import { StorageService } from 'app/core/services/storage.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule, SweetAlert2Module, TranslateModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent {
  private readonly service = inject(InvoiceService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);
  readonly storage = inject(StorageService);

  invoicesReadonly = toSignal(this.service.getAllInvoice(), {
    initialValue: [],
  });

  invoices = linkedSignal(() => this.invoicesReadonly());

  deleteItem(invoice: InvoiceResponse): void {
    this.service.delete(invoice.id).subscribe(() => {
      this.invoices.update((old) => old.filter((v) => v.id !== invoice.id));
      this.alert.showSuccess('deleted');
    });
  }

  updateItem(invoice: InvoiceResponse): void {
    this.router.navigate(['update-invoice', invoice.id], {
      state: { object: invoice },
    });
  }
}
