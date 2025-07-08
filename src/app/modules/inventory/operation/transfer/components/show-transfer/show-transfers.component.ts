import { Component, inject, linkedSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TransferService } from '../../transfer.service';
import { TransferResponse } from '../../models/response/transfer-response';

@Component({
  selector: 'app-show-transfers',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SweetAlert2Module,
  ],
  templateUrl: './show-transfers.component.html',
})
export class ShowTransfersComponent {
  private readonly service = inject(TransferService);
  private readonly router = inject(Router);

  // private readonly _transfers = toSignal(this.service.getAll(), {
  //   initialValue: [],
  // });
  transfers = linkedSignal<TransferResponse[]>(() => []);

  update(object: TransferResponse) {
    this.router.navigate(['update-warehouse', object.id], {
      state: { object },
    });
  }

  delete(object: TransferResponse) {
    this.service.delete(object.id).subscribe(() => {
      this.transfers.update((old) => old.filter((e) => e.id !== object.id));
    });
  }
}
