import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {FilterPipe} from './filter.pipe'
import { MatButtonModule } from '@angular/material/button';

interface Product {
  name: string;
  code: string;
  brand: string;
  price: number;
  unit: string;
  stock: number;
  createdAt: Date;
  image: string;
}

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIconModule,FilterPipe,MatButtonModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css'
})
export class ProductDisplayComponent {
  searchText: string = '';
  itemsPerPage: number = 10;

  products: Product[] = [
    { name: 'ملح', code: '123546', brand: 'الأسرة', price: 60.00, unit: 'كيلو جرام', stock: 83, createdAt: new Date('2025-03-15T06:11:00'), image: 'assets/images/salt.png' },
    { name: 'مياه أبين', code: '6281026050321', brand: 'نوفا', price: 600.00, unit: 'لتر', stock: 152, createdAt: new Date('2025-03-14T11:47:00'), image: 'assets/images/water.png' },
    { name: 'سكر', code: '6281016070325', brand: 'الأسرة', price: 10000.00, unit: 'kilogram', stock: 86, createdAt: new Date('2025-03-14T10:56:00'), image: 'assets/images/sugar.png' },
    { name: 'أرز بسمتي', code: '6281006090116', brand: 'أبو كاس', price: 25.00, unit: 'كيلو جرام', stock: 32, createdAt: new Date('2025-03-13T14:31:00'), image: 'assets/images/rice.png' },
    { name: 'زيت دوار الشمس', code: '6281006070217', brand: 'عافية', price: 30.00, unit: 'لتر', stock: 71, createdAt: new Date('2025-03-13T14:23:00'), image: 'assets/images/oil.png' },
    { name: 'حليب المراعي كامل الدسم', code: '6281006055016', brand: 'المراعي', price: 60.00, unit: 'piece', stock: 5, createdAt: new Date('2025-03-13T08:13:00'), image: 'assets/images/milk.png' }
  ];
}
