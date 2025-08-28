import { Component, OnInit, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-purchase',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, CardComponent, CustomFieldComponent, CustomSelectComponent, ProductSearchComponent],
  templateUrl: './edit-purchase.component.html',
  styleUrl: './edit-purchase.component.css'
})
export class EditPurchaseComponent implements OnInit {
  constructor(private alert: AlertService) {}

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly purchaseService = inject(PurchaseService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });

  purchaseId!: number;

statusOptions = [
  { id: 1, name: this.translate.instant('purchase.status.supply') },
  { id: 2, name: this.translate.instant('purchase.status.request') },
  { id: 3, name: this.translate.instant('purchase.status.buy') },
  { id: 4, name: this.translate.instant('purchase.status.receive') },
];



  form = this.fb.group({
    warehouseId: [0, Validators.required],
    supplyDate: [new Date().toISOString().split('.')[0]],
    notes: [''],
    status: [2, Validators.required],
    items: this.fb.array<FormGroup>([]),
  });

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.purchaseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.purchaseId) {
      this.loadPurchase(this.purchaseId);
    }
  }

  loadPurchase(id: number): void {
    this.purchaseService.getById(id).subscribe({
      next: (purchase) => {
        this.form.patchValue({
          warehouseId: purchase.warehouseId,
          supplyDate: purchase.supplyDate?.split('.')[0],
          notes: purchase.notes,
          status: this.getStatusCode(purchase.status),
        });

        // Fill items
        this.items.clear();
        purchase.items.forEach((item: any) => {
          this.items.push(
            this.fb.group({
              productId: [item.productId, Validators.required],
              qty: [item.qty, Validators.required],
              unitItemId: [item.unitItemId, Validators.required],
              unitFact: [item.unitFact, Validators.required],
            })
          );
        });
      },
      error: (err) => {
        console.error('Error loading purchase:', err);
        this.alert.showError('Failed to load purchase data.');
      },
    });
  }

  getStatusCode(status: string): number {
    switch (status) {
      case 'supply': return 1;
      case 'request': return 2;
      case 'buy': return 3;
      case 'receive': return 4;
      default: return 2;
    }
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
      status: Number(raw.status),
      items: raw.items.map((item: any) => ({
        productId: Number(item.productId),
        qty: Number(item.qty),
        unitItemId: Number(item.unitItemId),
        unitFact: Number(item.unitFact),
      })),
    };

    this.purchaseService.update(this.purchaseId, purchaseData).subscribe({
      next: (response) => {
        this.alert.showSuccess('updated');
        console.log('API Response:', response);
      },
      error: (err) => {
        console.error('Error updating purchase:', err);
        this.alert.showError(err?.error?.message || 'Failed to update purchase.');
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
