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
import { CustomSelectComponent } from '../../../../shared/components/custom-select.component';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { CardComponent } from '../../../../shared/components/card-form.component';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
  ],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  private fb = inject(NonNullableFormBuilder);
  readonly productType = [
    { key: '0', value: 'service' },
    { key: '1', value: 'warehouse' },
  ];
  barcodesColumns = ['#', 'unitItem', 'barcode', 'actions'];

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
  getPriceFormGroup(index: number): FormGroup {
    return this.prices.at(index) as FormGroup;
  }

  get barcodes(): FormArray<FormGroup> {
    return this.form.get('barcodes') as FormArray<FormGroup>;
  }
  getBarcodeFormGroup(index: number): FormGroup {
    return this.barcodes.at(index) as FormGroup;
  }

  createPriceRow(): FormGroup {
    const newRow = this.fb.group({
      priceType: ['', Validators.required],
      unitType: ['', Validators.required],
      price: [null, Validators.required, Validators.min(0)],
    });
    return newRow;
  }

  addPriceRow(): void {
    const newItem = this.createPriceRow();
    this.prices.push(newItem);
  }

  removePriceRow(index: number): void {
    this.prices.removeAt(index);
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
  }

  removeBarcodeRow(index: number): void {
    this.barcodes.removeAt(index);
  }

  onSubmit(): void {
    // if (this.form.valid) {
    //   console.log('Form Submitted:', this.form.value);
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
