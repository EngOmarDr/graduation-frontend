import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { CardComponent } from '../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../shared/components/custom-select.component';
import { ProductSearchComponent } from '../../../modules/inventory/product/components/search-product/search-product.component';
import { ProductResponse } from '../product/models/response/product-response';

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
    ProductSearchComponent,
  ],
  templateUrl: './barcode-print.component.html',
})
export class BarcodePrintComponent {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    warehouse: [''],
    productId: [null],
    barcode: [null],
    copies: [1],
    paperSize: ['A4'],
    showCompany: [true],
    showProduct: [true],
    showPrice: [true],
  });

  barcodes: { key: string; value: string }[] = [];

  selectedBarcodes: {
    productId: number;
    productName: string;
    barcode: string;
    copies: number;
    price: number;
  }[] = [];

  productList = signal<any[]>([]);
  selectedProducts = signal<any[]>([]);

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
    const printContents = document.getElementById('print-section')?.innerHTML;
    const paperSize = this.form.value.paperSize;

    if (!printContents) return;

    const popupWindow = window.open('', '_blank', 'width=800,height=600');
    if (popupWindow) {
      let customStyle = `
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        direction: rtl;
        text-align: center;
      }
      .barcode-item {
        margin: 10px;
        padding: 10px;
        border: 1px dashed #ccc;
        display: inline-block;
        width: auto;
      }
      .barcode-label {
        margin-top: 5px;
        font-size: 12px;
      }
    `;

      // تغيير النمط حسب حجم الورقة
      switch (paperSize) {
        case '80mm':
          customStyle += `
          .barcode-item {
            width: 80mm;
          }
        `;
          break;
        case 'label':
          customStyle += `
          .barcode-item {
            width: 50mm;
            height: 30mm;
          }
        `;
          break;
        default:
          // A4
          customStyle += `
          .barcode-item {
            width: 180px;
          }
        `;
      }

      popupWindow.document.open();
      popupWindow.document.write(`
      <html>
        <head>
          <title>طباعة الباركود</title>
          <style>${customStyle}</style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
      popupWindow.document.close();
    }
  }

  preview() {
    alert('عرض مبدئي للباركود');
  }

  onProductSelected(product: ProductResponse) {
    // this.form.controls['productId'].setValue(product.id);

    this.barcodes = product.barcodes.map((item) => ({
      key: item.barcode,
      value: item.barcode,
    }));

    // this.form.controls['barcode'].setValue(product.barcodes?.[0]);
  }

  getProductNameById(id: number): string {
    return 'اسم المنتج المؤقت';
  }

  addBarcodeToList() {
    const productId = this.form.value.productId;
    const barcode = this.form.value.barcode;
    const copies = this.form.value.copies;

    if (!productId || !barcode || !copies) return;

    const productName = this.getProductNameById(productId);
    const price = 15.75;

    this.selectedBarcodes.push({
      productId,
      productName,
      barcode,
      copies,
      price,
    });

    this.form.controls['barcode'].setValue(null);
    this.form.controls['copies'].setValue(1);
  }

  removeSelectedBarcode(index: number) {
    this.selectedBarcodes.splice(index, 1);
  }
}
