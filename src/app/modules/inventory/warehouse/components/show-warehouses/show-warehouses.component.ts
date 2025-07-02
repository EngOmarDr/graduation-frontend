import { Component, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { WarehouseResponse } from '../../models/response/warehouse-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { WarehouseService } from '../../services/warehouse.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-show-warehouses',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SweetAlert2Module,
  ],
  templateUrl: './show-warehouses.component.html',
})
export class ShowWarehousesComponent {
  private readonly service = inject(WarehouseService);
  private readonly router = inject(Router);

  private readonly _warehouses = toSignal(this.service.getAll(), {
    initialValue: [],
  });
  warehouses = linkedSignal(() => this._warehouses());

  updateWarehouse(object: WarehouseResponse) {
    this.router.navigate(['update-warehouse', object.id], {
      state: { object },
    });
  }

  deleteWarehouse(object: WarehouseResponse) {
    this.service.delete(object.id).subscribe(() => {
      this.warehouses.update((old) => old.filter((e) => e.id !== object.id));
    });
  }
}
