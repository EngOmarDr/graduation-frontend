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

@Component({
  selector: 'app-show-custom-journal',
  imports: [CardComponent, CommonModule, RouterModule],
  templateUrl: './show-custom-journal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCustomJournalsComponent {
  private readonly service = inject(JournalService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  journals = signal<JournalResponse[]>([]);
  journalType!: JournalTypeResponse;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      const navigation = window.history.state;
      if (navigation.state) {
        this.journalType = navigation.state;
      } else {
        this.location.back();
      }
      this.service.getJournals(this.journalType.id).subscribe((data) => {
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
      state: { object, journalType: this.journalType },
    });
  }
}
