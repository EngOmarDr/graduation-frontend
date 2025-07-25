import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PriceService } from 'app/modules/inventory/price/services/price.service';
import { UnitService } from 'app/modules/inventory/unit/services/unit.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { UnitItemResponse } from 'app/modules/inventory/unit/models/response/unit-item-response.model';
import { ProductService } from 'app/modules/inventory/product/services/product.service';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { TransferService } from '../../transfer.service';
import { TransferRequest } from '../../models/request/transfer-request';
import { ProductSearchComponent } from 'app/modules/inventory/product/components/search-product/search-product.component';
import { ProductResponse } from 'app/modules/inventory/product/models/response/product-response';
import { AccountSearchComponent } from 'app/modules/shared/account-search/account-search.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-add-transfer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    ProductSearchComponent,
    AccountSearchComponent,
    TranslateModule
  ],
  templateUrl: './add-transfer.component.html',
})
export class AddTransferComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ProductService);
  private readonly priceService = inject(PriceService);
  private readonly unitService = inject(UnitService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly transferService = inject(TransferService);

  pricesList = toSignal(this.priceService.getPrices(), { initialValue: [] });
  unitsList = toSignal(this.unitService.getUnits(), { initialValue: [] });
  unitItems = signal<UnitItemResponse[]>([]);
  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });
  unitItemsMap = signal<Record<number, UnitItemResponse[]>>({});

  form = this.fb.group({
    fromWarehouseId: [null, Validators.required],
    toWarehouseId: [null, Validators.required],
    cashAccountId: [null, Validators.required],
    expenseAccountId: [null, Validators.required],
    expenseValue: [null, Validators.required],
    date: [new Date().toISOString().split('.')[0]],
    driverName: ['', Validators.required],
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
      unitItemId: Number(item.unitItemId),
      unitFact: Number(item.unitFact),
    })),
  };

  this.transferService.create(transferData).subscribe({
    next: (response) => {
      console.log('Transfer created successfully:', response);
      this.form.reset();
    },
    error: (err) => {
      console.error('Error creating transfer:', err);
    }
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
