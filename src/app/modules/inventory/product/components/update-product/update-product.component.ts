import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
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
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../../models/response/product-response';
import { environment } from 'environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';


@Component({
  selector: 'app-update-product',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    TranslateModule
  ],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ProductService);
  private readonly priceService = inject(PriceService);
  private readonly unitService = inject(UnitService);
  private readonly groupService = inject(GroupService);
  private readonly location = inject(Location);
  private readonly activeRoute = inject(ActivatedRoute);

  pricesList = toSignal(this.priceService.getPrices(), { initialValue: [] });
  unitsList = toSignal(this.unitService.getUnits(), { initialValue: [] });
  groupsList = toSignal(this.groupService.getGroups(), { initialValue: [] });

  readonly productType = [
    { key: '0', value: 'warehouse' },
    { key: '1', value: 'service' },
  ];
  barcodesColumns = ['#', 'unitItem', 'barcode', 'actions'];

  file: File | undefined;
  // productId: number | undefined;

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    image: [''],
    groupId: this.fb.control<number | null>(null, Validators.required),
    defaultUnitId: this.fb.control<number | null>(null, Validators.required),
    minQty: this.fb.control<number | null>(null, Validators.required),
    maxQty: this.fb.control<number | null>(null, Validators.required),
    orderQty: this.fb.control<number | null>(null, Validators.required),
    notes: this.fb.control<string | undefined>(undefined),
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
  unitId = signal<number | null>(null);
  unitItems = computed(
    () => this.unitsList().find((e) => e.id == this.unitId())?.unitItems ?? []
  );
  imgSrc = signal<string | ArrayBuffer | null>(null);

  productState!: ProductResponse;
  ngOnInit() {
    this.loadStates();
    this.form.controls.defaultUnitId.valueChanges.subscribe((next) =>
      this.unitId.set(next)
    );
    this.form.controls.defaultUnitId.setValue(this.productState.defaultUnitId);
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
      this.service
        .updateProduct(window.history.state.object.id!, object)
        .subscribe(() => this.location.back());
          this.alert.showSuccess('updated');
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc.set(e.target?.result ?? null);
    };
    reader.readAsDataURL(event.target.files[0]); // Read the file as a data URL
  }

  loadStates() {
    const objectState = window.history.state.object as ProductResponse;
    this.productState = objectState;
    if (objectState) {
      this.form = this.fb.group({
        code: [objectState.code, Validators.required],
        name: [objectState.name, Validators.required],
        image: [''],
        groupId: this.fb.control<number | null>(
          objectState.groupId,
          Validators.required
        ),
        defaultUnitId: this.fb.control<number | null>(
          null,
          Validators.required
        ),
        minQty: this.fb.control<number | null>(
          objectState.minQty,
          Validators.required
        ),
        maxQty: this.fb.control<number | null>(
          objectState.maxQty,
          Validators.required
        ),
        orderQty: this.fb.control<number | null>(
          objectState.orderQty,
          Validators.required
        ),
        notes: this.fb.control<string | undefined>(objectState.notes),
        type: [objectState.type, Validators.required],
        prices: this.fb.array<FormGroup>(
          objectState.prices.map((e) =>
            this.fb.group({
              priceId: [e.priceId, Validators.required],
              unitItemId: [e.unitItemId, Validators.required],
              price: [e.price, [Validators.required, Validators.min(0)]],
            })
          ),

          Validators.required
        ),
        barcodes: this.fb.array<FormGroup>(
          objectState.barcodes.map((e) =>
            this.fb.group({
              unitItemId: [e.unitItemId, Validators.required],
              barcode: [e.barcode, Validators.required],
            })
          ),
          Validators.required
        ),
      });
      objectState.image
        ? this.imgSrc.set('http://localhost:8080' + objectState.image)
        : null;
    } else {
      this.service
        .getProductById(this.activeRoute.snapshot.paramMap.get('id')!)
        .subscribe({
          next: (next) => {
            this.form.patchValue(next);
          },
          error: () => {
            this.location.back();
          },
        });
    }
  }
}
