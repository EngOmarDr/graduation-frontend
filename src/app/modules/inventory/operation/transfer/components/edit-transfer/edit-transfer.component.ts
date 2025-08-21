import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ProductSearchComponent } from 'app/modules/inventory/product/components/search-product/search-product.component';
import { AccountSearchComponent } from 'app/modules/shared/account-search/account-search.component';

import { PriceService } from 'app/modules/inventory/price/services/price.service';
import { UnitService } from 'app/modules/inventory/unit/services/unit.service';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { TransferService } from '../../transfer.service';
import { UnitItemResponse } from 'app/modules/inventory/unit/models/response/unit-item-response.model';
import { ProductResponse } from 'app/modules/inventory/product/models/response/product-response';
import { TransferRequest } from '../../models/request/transfer-request';
import {TransferResponse} from '../../models/response/transfer-response'

import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-edit-transfer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    ProductSearchComponent,
    AccountSearchComponent,
    TranslateModule,
  ],
  templateUrl: './edit-transfer.component.html',
})
export class EditTransferComponent {
  constructor(
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly priceService = inject(PriceService);
  private readonly unitService = inject(UnitService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly transferService = inject(TransferService);

  pricesList = toSignal(this.priceService.getPrices(), { initialValue: [] });
  unitsList = toSignal(this.unitService.getUnits(), { initialValue: [] });
  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });

  unitItems = signal<UnitItemResponse[]>([]);
  unitItemsMap = signal<Record<number, UnitItemResponse[]>>({});

  transferId!: number;

form = this.fb.group({
  fromWarehouseId: this.fb.control<number | null>(null, { validators: Validators.required }),
  toWarehouseId: this.fb.control<number | null>(null, { validators: Validators.required }),
  cashAccountId: this.fb.control<number | null>(null, { validators: Validators.required }),
  expenseAccountId: this.fb.control<number | null>(null, { validators: Validators.required }),
  expenseValue: this.fb.control<number | null>(null, { validators: Validators.required }),
  date: this.fb.control<string>(new Date().toISOString().split('.')[0], { validators: Validators.required }),
  driverName: this.fb.control<string>('', { validators: Validators.required }),
  notes: this.fb.control<string>(''),
  items: this.fb.array<FormGroup>([]),
});


  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.transferId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTransfer();
  }

  loadTransfer(): void {
    this.transferService.getById(this.transferId).subscribe({
      next: (transfer: TransferResponse) => {
        this.form.patchValue({
          fromWarehouseId: transfer.fromWarehouseId,
          toWarehouseId: transfer.toWarehouseId,
          cashAccountId: transfer.cashAccountId,
          expenseAccountId: transfer.expenseAccountId,
          expenseValue: transfer.expenseValue,
          date: transfer.date,
          driverName: transfer.driverName,
          notes: transfer.notes,
        });
        this.items.clear();
        transfer.items.forEach(item => {
          this.items.push(
            this.fb.group({
              productId: [item.productId, Validators.required],
              qty: [item.qty, Validators.required],
              unitItemId: [item.unitItemId ?? 1, Validators.required],
              unitFact: [item.unitFact ?? 1, Validators.required],
            })
          );
        });
      },
      error: (err) => {
        console.error('Error loading transfer:', err);
        this.alert.showError('Failed to load transfer data.');
      },
    });
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
    const transferData: TransferRequest = {
      fromWarehouseId: Number(raw.fromWarehouseId),
      toWarehouseId: Number(raw.toWarehouseId),
      cashAccountId: Number(raw.cashAccountId),
      expenseAccountId: Number(raw.expenseAccountId),
      expenseValue: Number(raw.expenseValue),
      date: raw.date,
      driverName: raw.driverName,
      notes: raw.notes ?? '',
      items: raw.items.map((item: any) => ({
        productId: Number(item.productId),
        qty: Number(item.qty),
        unitItemId: item.unitItemId ? Number(item.unitItemId) : 1,
        unitFact: item.unitFact ? Number(item.unitFact) : 1,
      })),
    };

    this.transferService.update(this.transferId, transferData).subscribe({
      next: () => {
        this.alert.showSuccess('updated');
        this.router.navigate(['/transfers']);
      },
      error: (err) => {
        console.error('Error updating transfer:', err);
        this.alert.showError(err?.error?.message || 'Failed to update transfer.');
      },
    });
  }

  onProductSelected(product: ProductResponse, row: AbstractControl) {
    row.get('productId')?.setValue(product.id);
    if (product.defaultUnitId) {
      row.get('unitItemId')?.setValue(product.defaultUnitId);
    }
    if (product.unitItems) {
      const map = { ...this.unitItemsMap() };
      map[product.id] = product.unitItems;
      this.unitItemsMap.set(map);
    }
  }
}
