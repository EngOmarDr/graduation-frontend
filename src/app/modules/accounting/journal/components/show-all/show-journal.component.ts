import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { JournalService } from '../../service/journal.service';
import { JournalResponse } from '../../models/reponse/journal-response.model';
import { JournalTypesService } from 'app/modules/accounting/journal-type/services/journal-types.service';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceTypeService } from 'app/modules/inventory/invoice-type/services/invoice-type.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-journals',
  imports: [CardComponent, CommonModule, RouterModule,TranslateModule,SweetAlert2Module],
  templateUrl: './show-journal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowJournalsComponent {
  constructor(private alert: AlertService) {}
  private readonly service = inject(JournalService);
  private readonly router = inject(Router);
  private readonly jt = inject(JournalTypesService);
  private readonly invoiceTypeService = inject(InvoiceTypeService);
  journalTypes = this.jt.journalTypes;
  invoiceTypes = this.invoiceTypeService.invoiceTypes;
  journals = signal<JournalResponse[]>([]);

  ngOnInit(): void {
    this.service.getJournals().subscribe((data) => {
      this.journals.set(data);
      console.log(this.journals());

    });
  }

  deleteItem(voucher: JournalResponse): void {
      this.service.deleteJournal(voucher.id).subscribe(() => {
        this.journals.update((old) => old.filter((v) => v.id !== voucher.id));
      });
    this.alert.showSuccess('deleted');
  }

  updateItem(object: JournalResponse): void {
    this.router.navigate(['journal/update-journal', object.id], {
      state: { object },
    });
  }

  getJournalTypeName(id: number) {
    return this.journalTypes().find((item) => item.id === id)?.name;
  }
  getInvoiceTypeName(id: number) {
    return this.invoiceTypes().find((item) => item.id === id)?.name;
  }
}
