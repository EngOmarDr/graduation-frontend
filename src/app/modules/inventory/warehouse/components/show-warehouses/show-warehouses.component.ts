import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WarehouseResponse } from '../../models/response/warehouse-response.models';
import { CardComponent } from '@shared/components/card-form.component';

@Component({
  selector: 'app-show-warehouses',
  standalone: true,
  imports: [CardComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './show-warehouses.component.html',
})
export class ShowWarehousesComponent implements OnInit {
  displayedColumns: string[] = [
    '#',
    'Name',
    'Code',
    'Parent Name',
    'address',
    'notes',
    'action',
  ];

  warehouses = signal<WarehouseResponse[]>([]);

  ngOnInit() {}

  updateWarehouse(warehouse: WarehouseResponse) {
    alert(`Edit warehouse: ${warehouse.id}`);
  }

  deleteWarehouse(warehouse: WarehouseResponse) {
    alert(`Delete warehouse: ${warehouse.id}`);
    // this.dataSource.data = this.dataSource.data.filter((w) => w.id !== warehouse.id);
  }
}
