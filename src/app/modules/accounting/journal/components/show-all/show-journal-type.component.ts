import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { JournalService } from '../../service/journal.service'


interface Branch {
  id: number;
  name: string;
  phone: string;
  address: string;
  notes: string | null;
}

interface Currency {
  id: number;
  code: string;
  name: string;
  currencyValue: number;
  partName: string;
  partPrecision: number;
}

interface VoucherItem {
  id: number;
  jornalHeader: number;
  accountId: number;
  accountName: string;
  debit: number;
  credit: number;
  currency: Currency;
  currencyValue: number;
  date: string;
  notes: string | null;
}

interface Voucher {
  id: number;
  branch: Branch;
  date: string;
  debit: number;
  credit: number;
  currency: Currency;
  currencyValue: number;
  parentType: string | null;
  parentId: number | null;
  isPosted: boolean;
  postDate: string | null;
  notes: string | null;
  items: VoucherItem[];
}

@Component({
  selector: 'app-show-journal-types',
  imports: [CardComponent, CommonModule,RouterModule],
  templateUrl: './show-journal-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowJournalsComponent {
  private readonly service = inject(JournalService);
  private readonly router = inject(Router);

  vouchers = signal<Voucher[]>([]);

   displayedColumns = [
    'branch',
    'date',
    'currency',
    'currencyValue',
    'isPosted',
    'notes',
  ];


  ngOnInit(): void {
    this.service.getJournals().subscribe((data) => {
      this.vouchers.set(data);
    });
  }


  deleteItem(voucher: Voucher): void {
    if (confirm('هل أنت متأكد من حذف هذا السند؟')) {
      this.service.deleteJournal(voucher.id).subscribe(() => {
        this.vouchers.update((old) => old.filter((v) => v.id !== voucher.id));
      });
    }
  }
}
