import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../components/card-form.component';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators ,FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent
],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  stockForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      productImages: [null],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      barcodeType: ['', Validators.required],
      productUnit: ['', Validators.required],
      unitOfSale: ['', Validators.required],
      additionalUnit: [''],
      status: ['', Validators.required],
      quantityLimit: [''],
      notes: [''],
      productType: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCost: ['', Validators.required],
      taxType: [''],
      addedQuantity: [''],
      stockAlert: [''],
      orderTax: [''],
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      console.log('Form Submitted:', this.stockForm.value);
    } else {
      this.stockForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.stockForm.patchValue({
        productImages: files
      });
    }
  }
}
