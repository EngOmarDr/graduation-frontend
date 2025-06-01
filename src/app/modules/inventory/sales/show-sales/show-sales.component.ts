import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card-form.component';

export interface Sale {
  id: string;
  customer: string;
  warehouse: string;
  status: string;
  total: number;
  paid: number;
  paymentType: string;
  createdAt: Date;
}

@Component({
  selector: 'app-show-sales',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,

    CommonModule
  ],
  templateUrl: './show-sales.component.html',
})
export class ShowSalesComponent {
  displayedColumns: string[] = [
    'id',
    'customer',
    'warehouse',
    'status',
    'total',
    'paid',
    'paymentType',
    'createdAt',
    'action',
  ];
  // dataSource: MatTableDataSource<Sale>;
  form = new FormGroup({
    filter: new FormControl(''),
  });

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const sales = Array.from({ length: 50 }, (_, k) => createNewSale(k + 1));
    // this.dataSource = new MatTableDataSource(sales);
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
  get totalSales(): number {
    return 0;
    // return this.dataSource.filteredData.reduce((sum, sale) => sum + sale.total, 0);
  }

  get totalPaid(): number {
    return 0;
    // return this.dataSource.filteredData.reduce((sum, sale) => sum + sale.paid, 0);
  }

  editSale(sale: Sale) {
    alert(`Edit Sale: ${sale.id}`);
  }

  deleteSale(sale: Sale) {
    alert(`Delete Sale: ${sale.id}`);
    // this.dataSource.data = this.dataSource.data.filter((s) => s.id !== sale.id);
  }

  showSale(sale: Sale) {
    alert(`Show Sale: ${sale.id}`);
  }
}

function createNewSale(id: number): Sale {
  const randomString = () => Math.random().toString(36).substring(2, 7);
  const total = parseFloat((Math.random() * 1000).toFixed(2));
  const paid = parseFloat((Math.random() * total).toFixed(2));
  return {
    id: id.toString(),
    customer: `Customer-${randomString()}`,
    warehouse: `Warehouse-${randomString()}`,
    status: ['Pending', 'Completed', 'Cancelled'][Math.floor(Math.random() * 3)],
    total,
    paid,
    paymentType: ['Cash', 'Credit Card', 'Bank Transfer'][Math.floor(Math.random() * 3)],
    createdAt: new Date(),
  };
}
