import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { InvoiceTypeService } from '../../services/invoice-type.service';
import { InvoiceTypeResponse } from '../../models/response/invoice-type-response';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-journal-types',
  imports: [CardComponent, CommonModule, RouterModule,SweetAlert2Module,TranslateModule],
  templateUrl: './show-invoice-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowInvoiceTypesComponent {
  private readonly service = inject(InvoiceTypeService);
  private readonly router = inject(Router);

  types = this.service.invoiceTypes;

  page = 1;
  perPage = 10;

  get totalPages(): number {
    return Math.ceil(this.types().length / this.perPage);
  }

  paginatedTypes() {
    const start = (this.page - 1) * this.perPage;
    return this.types().slice(start, start + this.perPage);
  }

  updateItem(object: InvoiceTypeResponse) {
    this.router.navigate(['update-invoice-type', object.id], {
      state: { object },
    });
  }

  deleteItem(object: InvoiceTypeResponse): void {
    this.service.delete(object.id).subscribe(() => {
      this.types.update((old) => old.filter((item) => item.id != object.id));
      if (this.page > this.totalPages) {
        this.page = this.totalPages || 1;
      }
    });
  }
}

