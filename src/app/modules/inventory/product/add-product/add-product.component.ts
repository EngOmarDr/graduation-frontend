import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CardComponent } from '../../../shared/components/card-form.component';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  private fb = inject(NonNullableFormBuilder);

  pricesColumns: string[] = ['#', 'priceType', 'unitName', 'price', 'actions'];
  barcodesColumns = ['#', 'unitItem', 'barcode', 'actions'];
  productPricesData = new MatTableDataSource<AbstractControl>([]);
  productBarcodesData = new MatTableDataSource<AbstractControl>([]);
  file: any;

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    type: ['', Validators.required],
    unit: [null],
    prices: this.fb.array<FormGroup>([], Validators.required),
    barcodes: this.fb.array<FormGroup>([], Validators.required),
    image: [''],
    minQty: ['', Validators.min(0)],
    maxQty: ['', Validators.min(0)],
    orderQty: ['', Validators.min(0)],
    productImages: [null],
    group: ['', Validators.required],
    notes: [''],
  });

  get prices(): FormArray<FormGroup> {
    return this.form.get('prices') as FormArray<FormGroup>;
  }
  get barcodes(): FormArray<FormGroup> {
    return this.form.get('barcodes') as FormArray<FormGroup>;
  }

  createPriceRow(): FormGroup {
    const newRow = this.fb.group({
      priceType: ['', Validators.required],
      unitType: ['', Validators.required],
      price: [null, Validators.required, Validators.min(0)],
    });
    return newRow;
  }

  addRow(): void {
    const newItem = this.createPriceRow();
    this.prices.push(newItem);
    this.updatePricesData();
  }

  removeRow(index: number): void {
    this.prices.removeAt(index);

    this.updatePricesData();
  }

  private updatePricesData(): void {
    this.productPricesData.data = this.prices.controls;
  }

  createBarcodeRow(): FormGroup {
    const newRow = this.fb.group({
      unitItem: ['', Validators.required],
      barcode: ['', Validators.required],
    });
    return newRow;
  }

  addBarcodeRow(): void {
    const newItem = this.createBarcodeRow();
    this.barcodes.push(newItem);
    this.updateBarcodesData();
  }

  removeBarcodeRow(index: number): void {
    this.barcodes.removeAt(index);

    this.updateBarcodesData();
  }

  private updateBarcodesData(): void {
    this.productBarcodesData.data = this.barcodes.controls;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
