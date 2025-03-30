import { Component, ViewChild,AfterViewInit  } from '@angular/core';
import { CardComponent } from '../../../components/card-form.component';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Product {
  id: string;
  name: string;
  code: number;
  brand: string;
  price: number;
  unit: string;
  inStock: number;
  createdAt: Date;
}

@Component({
  selector: 'app-show-products',
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
  templateUrl: './show-products.component.html',
})
export class ShowProductsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'brand',
    'price',
    'unit',
    'inStock',
    'createdAt',
    'action',
  ];
  dataSource: MatTableDataSource<Product>;
  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {
    const products = Array.from({ length: 100 }, (_, k) => createNewProduct(k + 1));
    this.dataSource = new MatTableDataSource(products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(product: Product) {
    alert(`Edit Product: ${product.id}`);
  }

  deleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete product: ${product.name}?`)) {
      this.dataSource.data = this.dataSource.data.filter((p) => p.id !== product.id);
    }
  }
  viewProduct(product: any) {
    alert(`Viewing product details: ${product.id}`);
  }

}

/** دالة لإنشاء بيانات عشوائية للمنتجات */
function createNewProduct(id: number): Product {
  return {
    id: id.toString(),
    name: `Product ${id}`,
    code: 1000 + id,
    brand: `Brand ${id % 10}`,
    price: Math.floor(Math.random() * 100) + 10,
    unit: 'pcs',
    inStock: Math.floor(Math.random() * 50),
    createdAt: new Date(),
  };
}
