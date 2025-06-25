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

@Component({
  selector: 'app-show-journals',
  imports: [CardComponent, CommonModule, RouterModule],
  templateUrl: './show-journal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowJournalsComponent {
  private readonly service = inject(JournalService);
  private readonly router = inject(Router);
  private readonly jt = inject(JournalTypesService);
  journalTypes = this.jt.journalTypes;
  journals = signal<JournalResponse[]>([]);

  ngOnInit(): void {
    this.service.getJournals().subscribe((data) => {
      this.journals.set(data);
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
    this.router.navigate(['journal/update-journal', object.id], {
      state: { object },
    });
  }

  getJournalTypeName(id: number) {
    return this.journalTypes().find((item) => item.id === id)?.name;
  }
}
