import { Component, inject, signal, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TransferService } from '../../transfer.service';
import { TransferResponse } from '../../models/response/transfer-response';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-transfers',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SweetAlert2Module,
    TranslateModule
  ],
  templateUrl: './show-transfers.component.html',
})
export class ShowTransfersComponent {
  private readonly service = inject(TransferService);
  private readonly router = inject(Router);

  readonly transfers = signal<TransferResponse[]>([]);

  constructor(private alert: AlertService) {
    this.service.getAll().subscribe((data) => {
      this.transfers.set(data);
    });
  }

  update(object: TransferResponse) {
    this.router.navigate(['update-warehouse', object.id], {
      state: { object },
    });
  }

  delete(object: TransferResponse) {
    this.service.delete(object.id).subscribe(() => {
      this.transfers.update((old) => old.filter((e) => e.id !== object.id));
    });
    this.alert.showSuccess('deleted');
  }
}
