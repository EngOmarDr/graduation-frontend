import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../components/card-form.component';
import { CustomFieldComponent } from '../../components/custom-field.component';
import { CustomSelectComponent } from '../../components/custom-select.component';
import { NgxBarcode6Module } from 'ngx-barcode6';

@Component({
  selector: 'app-barcode-print',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    NgxBarcode6Module,
  ],
  templateUrl: './barcode-print.component.html',
})
export class BarcodePrintComponent {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    warehouse: new FormControl(''),
    productCode: new FormControl(''),
    showCompany: new FormControl(true),
    showProduct: new FormControl(true),
    showPrice: new FormControl(true),
    paperSize: new FormControl('A4'),
  });

  productList = signal<any[]>([]);
  selectedProducts = signal<any[]>([]);

  warehouses = [
    { key: '', value: 'اختر المستودع' },
    { key: '1', value: 'مستودع رقم 1' },
    { key: '2', value: 'مستودع رقم 2' },
  ];

  paperSizes = [
    { key: 'A4', value: 'A4' },
    { key: '80mm', value: '80mm حراري' },
    { key: 'label', value: 'Label 50x30mm' },
  ];

  searchProduct() {
    const code = this.form.value.productCode?.trim();
    if (!code) return;
    const dummy = {
      code,
      name: `منتج ${code}`,
      price: 15.75,
      qty: 1,
    };
    this.selectedProducts.update((p) => [...p, dummy]);
  }

  removeProduct(index: number) {
    this.selectedProducts.update((list) => list.filter((_, i) => i !== index));
  }

  reset() {
    this.form.reset({
      showCompany: true,
      showProduct: true,
      showPrice: true,
      paperSize: 'A4',
    });
    this.selectedProducts.set([]);
  }

  print() {
    window.print();
  }

  preview() {
    alert('عرض مبدئي للباركود');
  }
}
