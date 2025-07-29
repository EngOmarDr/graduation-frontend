import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { JournalTypeResponse } from 'app/modules/accounting/journal-type/models/response/journal-type-response.model';
import { JournalTypesService } from '../../services/journal-types.service';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-journal-types',
  imports: [CardComponent, CommonModule, RouterModule,TranslateModule,SweetAlert2Module],
  templateUrl: './show-journal-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowJournalTypesComponent {
  constructor(private alert: AlertService) {}
  private readonly service = inject(JournalTypesService);
  private readonly router = inject(Router);

  journalTypes = this.service.journalTypes;

  // ngOnInit(): void {
  //   this.service.getJournalTypes().subscribe();
  // }

  updateItem(object: JournalTypeResponse) {
    this.router.navigate([
      'update-journalType',
      object.id,
      { state: { object } },
    ]);
  }

  deleteItem(object: JournalTypeResponse): void {
      this.service.deleteJournalType(object.id).subscribe(() => {
        this.journalTypes.update((old) =>
          old.filter((item) => item.id != object.id)
        );
      });
      this.alert.showSuccess('deleted');
  }
}
