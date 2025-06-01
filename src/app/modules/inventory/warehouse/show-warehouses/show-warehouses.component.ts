import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card-form.component';

export interface Warehouse {
  id: string;
  warehouse: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  createdAt: string;
}

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte',
  'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper', 'Cora', 'Levi',
  'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth',
];

@Component({
  selector: 'app-show-warehouses',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './show-warehouses.component.html',
})
export class ShowWarehousesComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'warehouse', 'phone', 'country', 'city', 'createdAt', 'action',
  ];
  // dataSource = new MatTableDataSource<Warehouse>([]);
  form = new FormGroup({
    filter: new FormControl(''),
  });

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const warehouses = Array.from({ length: 100 }, (_, k) => this.createNewWarehouse(k + 1));
    // this.dataSource = new MatTableDataSource(warehouses);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  editWarehouse(warehouse: Warehouse) {
    alert(`Edit warehouse: ${warehouse.id}`);
  }

  deleteWarehouse(warehouse: Warehouse) {
    alert(`Delete warehouse: ${warehouse.id}`);
    // this.dataSource.data = this.dataSource.data.filter((w) => w.id !== warehouse.id);
  }

  viewWarehouse(warehouse: Warehouse) {
    alert(`View warehouse: ${warehouse.id}`);
  }

  private createNewWarehouse(id: number): Warehouse {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    return {
      id: id.toString(),
      warehouse: `${randomName} Warehouse`,
      phone: Math.random() > 0.5 ? `+1-555-${Math.floor(1000 + Math.random() * 9000)}` : null,
      country: Math.random() > 0.5 ? 'USA' : 'Canada',
      city: Math.random() > 0.5 ? 'New York' : 'Toronto',
      createdAt: new Date().toISOString().split('T')[0],
    };
  }
}
