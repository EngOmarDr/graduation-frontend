import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule, Location } from '@angular/common';
import { JournalService } from 'app/modules/accounting/journal/service/journal.service';
import { JournalResponse } from 'app/modules/accounting/journal/models/reponse/journal-response.model';
import { JournalTypeResponse } from 'app/modules/accounting/journal-type/models/response/journal-type-response.model';
import { InvoiceTypeService } from 'app/modules/inventory/invoice-type/services/invoice-type.service';
import { InvoiceTypeResponse } from 'app/modules/inventory/invoice-type/models/response/invoice-type-response';

@Component({
  selector: 'app-show-custom-journal',
  imports: [CardComponent, CommonModule, RouterModule],
  templateUrl: './show-custom-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCustomInvoicesComponent {
  private readonly service = inject(JournalService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  journals = signal<JournalResponse[]>([]);
  invoiceType!: InvoiceTypeResponse;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      const navigation = window.history.state;
      if (navigation.journalType) {
        this.invoiceType = navigation.journalType;
      } else {
        this.location.back();
      }
      this.service.getJournals(this.invoiceType.id).subscribe((data) => {
        this.journals.set(data);
      });
    });
  }

  deleteItem(voucher: JournalResponse): void {
    if (confirm('are you sure you want to delete ?')) {
      this.service.deleteJournal(voucher.id).subscribe(() => {
        this.journals.update((old) => old.filter((v) => v.id !== voucher.id));
      });
    }
  }

  updateItem(object: JournalResponse): void {
    this.router.navigate(['update-custom-journal', object.id], {
      state: { object, journalType: this.invoiceType },
    });
  }
}
