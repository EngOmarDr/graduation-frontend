import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule, Location } from '@angular/common';
import { InvoiceTypeResponse } from 'app/modules/inventory/invoice-type/models/response/invoice-type-response';
import { InvoiceService } from '../../service/invoice.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InvoiceResponse } from '../../models/response/invoice-response';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-show-custom-journal',
  imports: [CardComponent, CommonModule, RouterModule, SweetAlert2Module],
  templateUrl: './show-custom-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCustomInvoicesComponent {
  private readonly service = inject(InvoiceService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  invoiceType = signal<InvoiceTypeResponse>(window.history.state.state);
  invoicesReadonly = toSignal(this.service.getAll(this.invoiceType()?.id), {
    initialValue: [],
  });
  invoices = linkedSignal(() => this.invoicesReadonly());

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      const navigation = window.history.state;
      if (navigation.state) {
        this.invoiceType.set(navigation.state);
      } else {
        this.location.back();
      }
      // this.service.getAll(this.invoiceType()?.id).subscribe((data) => {
      //   this.invoices.set(data);
      // });
    });
  }

  deleteItem(voucher: InvoiceResponse): void {
    this.service.delete(voucher.id).subscribe(() => {
      this.invoices.update((old) => old.filter((v) => v.id !== voucher.id));
    });
  }

  updateItem(object: InvoiceResponse): void {
    this.router.navigate(['update-invoice', object.id], {
      state: { object, invoiceType: this.invoiceType() },
    });
  }
}
