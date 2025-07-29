import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule, Location } from '@angular/common';
import { InvoiceTypeResponse } from 'app/modules/inventory/invoice-type/models/response/invoice-type-response';
import { InvoiceService } from '../../service/invoice.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { InvoiceResponse } from '../../models/response/invoice-response';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-custom-journal',
  imports: [CardComponent, CommonModule, RouterModule, SweetAlert2Module,TranslateModule],
  templateUrl: './show-custom-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCustomInvoicesComponent {
  constructor(private alert: AlertService) {}
  private readonly service = inject(InvoiceService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  invoiceType = signal<InvoiceTypeResponse>(window.history.state.state);
  // Create an observable that reacts to invoiceType changes
  invoices$ = toObservable(this.invoiceType).pipe(
    switchMap((type) => this.service.getAll(type?.id))
  );

  // Convert to signal
  invoicesReadonly = toSignal(this.invoices$, {
    initialValue: [],
  });

  invoices = linkedSignal(() => this.invoicesReadonly());

  ngOnInit(): void {
    console.log(this.invoiceType());

    this.activatedRoute.params.subscribe(() => {
      const navigation = window.history.state;
      console.log(window.history.state);

      if (navigation.state) {
        this.invoiceType.set(navigation.state);
      } else {
        this.location.back();
      }
    });
  }

  deleteItem(voucher: InvoiceResponse): void {
    this.service.delete(voucher.id).subscribe(() => {
      this.invoices.update((old) => old.filter((v) => v.id !== voucher.id));
    });
    this.alert.showSuccess('deleted');
  }

  updateItem(object: InvoiceResponse): void {
    this.router.navigate(['update-invoice', object.id], {
      state: { object, invoiceType: this.invoiceType() },
    });
  }
}
