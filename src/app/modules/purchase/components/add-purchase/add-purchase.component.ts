import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../purchase.service';
import { PurchaseRequest } from '../../models/request/purchase-request';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { ProductService } from 'app/modules/inventory/product/services/product.service';
import { ProductResponse } from 'app/modules/inventory/product/models/response/product-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ProductSearchComponent } from 'app/modules/inventory/product/components/search-product/search-product.component';

@Component({
  selector: 'app-add-purchase',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, CardComponent, CustomFieldComponent, CustomSelectComponent,ProductSearchComponent],
  templateUrl: './add-purchase.component.html',
})
export class AddPurchaseComponent {
  constructor(private alert: AlertService) {}

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly purchaseService = inject(PurchaseService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly productService = inject(ProductService);

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });

  form = this.fb.group({
    warehouseId: [null, Validators.required],
    supplyDate: [new Date().toISOString().split('.')[0]],
    notes: [''],
    items: this.fb.array<FormGroup>([
      this.fb.group({
        productId: [null, Validators.required],
        qty: [null, Validators.required],
        unitItemId: [1, Validators.required],
        unitFact: [1, Validators.required],
      }),
    ]),
  });

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  addRow(): void {
    const newRow = this.fb.group({
      productId: [null, Validators.required],
      qty: [null, Validators.required],
      unitItemId: [1, Validators.required],
      unitFact: [1, Validators.required],
    });
    this.items.push(newRow);
  }

  removeRow(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alert.showError('Please fill all required fields.');
      return;
    }

    const raw = this.form.getRawValue();

    const purchaseData: PurchaseRequest = {
      warehouseId: Number(raw.warehouseId),
      supplyDate: raw.supplyDate,
      notes: raw.notes ?? '',
      items: raw.items.map((item: any) => ({
        productId: Number(item.productId),
        qty: Number(item.qty),
        unitItemId: Number(item.unitItemId),
        unitFact: Number(item.unitFact),
      })),
    };

    console.log('Sending payload to API:', purchaseData);

    this.purchaseService.create(purchaseData).subscribe({
      next: (response) => {
        this.alert.showSuccess('added');
        console.log('API Response:', response);
        this.form.reset({
          warehouseId: null,
          supplyDate: new Date().toISOString().split('.')[0],
          notes: '',
          items: [],
        });
        this.addRow();
      },
      error: (err) => {
        console.error('Error creating purchase:', err);
        this.alert.showError(err?.error?.message || 'Failed to create purchase.');
      },
    });
  }

  onProductSelected(product: ProductResponse, row: AbstractControl) {
    row.get('productId')?.setValue(product.id);
    if (product.defaultUnitId) {
      row.get('unitItemId')?.setValue(product.defaultUnitId);
    }
  }
}
