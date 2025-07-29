import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { PriceService } from 'app/modules/inventory/price/services/price.service';
import { UnitService } from 'app/modules/inventory/unit/services/unit.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductRequest } from '../../models/request/product-request';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { GroupService } from 'app/modules/inventory/group/services/group.service';
import { UnitItemResponse } from 'app/modules/inventory/unit/models/response/unit-item-response.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    TranslateModule
  ],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
    constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ProductService);
  private readonly priceService = inject(PriceService);
  private readonly unitService = inject(UnitService);
  private readonly groupService = inject(GroupService);

  pricesList = toSignal(this.priceService.getPrices(), { initialValue: [] });
  unitsList = toSignal(this.unitService.getUnits(), { initialValue: [] });
  unitItems = signal<UnitItemResponse[]>([]);
  groupsList = toSignal(this.groupService.getGroups(), { initialValue: [] });

  readonly productType = [
    { key: '0', value: 'warehouse' },
    { key: '1', value: 'service' },
  ];
  barcodesColumns = ['#', 'unitItem', 'barcode', 'actions'];

  file: File | undefined;

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    image: [undefined],
    groupId: [null, Validators.required],
    defaultUnitId: [null, Validators.required],
    minQty: [undefined, Validators.min(0)],
    maxQty: [undefined, Validators.min(0)],
    orderQty: [undefined, Validators.min(0)],
    notes: [undefined],
    type: [0, Validators.required],
    prices: this.fb.array<FormGroup>(
      [
        this.fb.group({
          priceId: [null, Validators.required],
          unitItemId: [null, Validators.required],
          price: [null, [Validators.required, Validators.min(0)]],
        }),
      ],
      Validators.required
    ),
    barcodes: this.fb.array<FormGroup>(
      [
        this.fb.group({
          unitItemId: [null, Validators.required],
          barcode: ['', Validators.required],
        }),
      ],
      Validators.required
    ),
  });

  ngOnInit() {
    this.form.controls.defaultUnitId.valueChanges.subscribe((next) => {
      this.unitItems.set(
        this.unitsList().find((e) => e.id == next)?.unitItems ?? []
      );
    });
  }

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
      priceId: [null, Validators.required],
      unitItemId: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
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
      unitItemId: [null, Validators.required],
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
    if (this.form.valid) {
      let object: ProductRequest = {
        name: this.form.controls.name.value,
        code: this.form.controls.code.value,
        type: this.form.controls.type.value,
        defaultUnitId: this.form.controls.defaultUnitId.value!,
        groupId: this.form.controls.groupId.value!,
        maxQty: this.form.controls.maxQty.value!,
        minQty: this.form.controls.minQty.value!,
        orderQty: this.form.controls.orderQty.value!,
        image: this.file,
        notes: this.form.controls.notes.value,
        barcodes: this.form.controls.barcodes.value,
        prices: this.form.controls.prices.value,
      };
      console.log(object);

      this.service.createProduct(object).subscribe(() => this.form.reset());
      this.alert.showSuccess('added');
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
  }
}
