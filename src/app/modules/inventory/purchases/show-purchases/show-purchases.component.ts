import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card-form.component';

export interface Purchase {
  id: string;
  supplier: string;
  warehouse: string;
  status: string;
  total: string;
  paymentType: string;
  createdAt: Date;
}

@Component({
  selector: 'app-show-purchases',
  standalone: true,
  imports: [
    CardComponent,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule
  ],
  templateUrl: './show-purchases.component.html',
})
export class ShowPurchasesComponent {
  displayedColumns: string[] = [
    'id',
    'supplier',
    'warehouse',
    'status',
    'total',
    'paymentType',
    'createdAt',
    'action',
  ];
  dataSource: MatTableDataSource<Purchase>;
  totalPurchases: number = 0; // إجمالي المشتريات
  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const purchases = Array.from({ length: 50 }, (_, k) => createNewPurchase(k + 1));
    this.dataSource = new MatTableDataSource(purchases);
    this.calculateTotalPurchases(); // حساب إجمالي المشتريات بعد تحميل البيانات
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPurchase(purchase: Purchase) {
    alert(`Edit Purchase: ${purchase.id}`);
  }

  deletePurchase(purchase: Purchase) {
    alert(`Delete Purchase: ${purchase.id}`);
    this.dataSource.data = this.dataSource.data.filter((p) => p.id !== purchase.id);
    this.calculateTotalPurchases(); // إعادة حساب الإجمالي بعد الحذف
  }

  showPurchase(purchase: Purchase) {
    alert(`Show Purchase: ${purchase.id}`);
  }

  // حساب إجمالي المشتريات
  calculateTotalPurchases() {
    this.totalPurchases = this.dataSource.data.reduce((sum, purchase) => {
      return sum + parseFloat(purchase.total);
    }, 0);
  }
}

function createNewPurchase(id: number): Purchase {
  const randomString = () => Math.random().toString(36).substring(2, 7);
  return {
    id: id.toString(),
    supplier: `Supplier-${randomString()}`,
    warehouse: `Warehouse-${randomString()}`,
    status: ['Pending', 'Completed', 'Cancelled'][Math.floor(Math.random() * 3)],
    total: (Math.random() * 1000).toFixed(2),
    paymentType: ['Cash', 'Credit Card', 'Bank Transfer'][Math.floor(Math.random() * 3)],
    createdAt: new Date(),
  };
}
