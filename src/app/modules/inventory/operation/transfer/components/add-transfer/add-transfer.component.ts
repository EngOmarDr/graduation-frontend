import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormArray,
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

@Component({
  selector: 'app-add-transfer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
  ],
  templateUrl: './add-transfer.component.html',
})
export class AddTransferComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ProductService);
  private readonly priceService = inject(PriceService);
  private readonly unitService = inject(UnitService);
  private readonly warehouseService = inject(WarehouseService);

  pricesList = toSignal(this.priceService.getPrices(), { initialValue: [] });
  unitsList = toSignal(this.unitService.getUnits(), { initialValue: [] });
  unitItems = signal<UnitItemResponse[]>([]);
  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });

  form = this.fb.group({
    fromWarehouseId: ['', Validators.required],
    toWarehouseId: ['', Validators.required],
    date: [new Date().toISOString().slice(0, 10)],
    notes: [''],
    items: this.fb.array<FormGroup>(
      [
        this.fb.group({
          productId: [null, Validators.required],
          quantity: [null, Validators.required],
        }),
      ],
      Validators.required
    ),
  });

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  addRow(): void {
    const newRow = this.fb.group({
      productId: [null, Validators.required],
      quantity: [null, Validators.required],
    });
    this.items.push(newRow);
  }

  removeRow(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    console.log(typeof this.form.controls.fromWarehouseId.value);
    if (this.form.valid) {
      // this.service.createProduct(object).subscribe(() => this.form.reset());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
