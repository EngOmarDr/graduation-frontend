import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { AccountSearchComponent } from '../../../../shared/account-search/account-search.component';
import { InvoiceTypeResponse } from 'app/modules/inventory/invoice-type/models/response/invoice-type-response';
import { ProductSearchComponent } from '../../../product/components/search-product/search-product.component';
import { InvoiceService } from '../../service/invoice.service';
import { StorageService } from 'app/core/services/storage.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NumberFormatDirective } from 'app/core/directives/number-format.directive';
import { ProductResponse } from 'app/modules/inventory/product/models/response/product-response';
import { UnitService } from 'app/modules/inventory/unit/services/unit.service';
import { UnitResponse } from 'app/modules/inventory/unit/models/response/unit-response.model';
import { UnitItemResponse } from 'app/modules/inventory/unit/models/response/unit-item-response.model';

@Component({
  selector: 'app-add-custom-journal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    NgSelectModule,
    ValidationMessageComponent,
    AccountSearchComponent,
    ProductSearchComponent,
  ],
  providers: [NumberFormatDirective],
  templateUrl: './add-custom-invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomInvoiceComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly currencyService = inject(CurrencyService);
  private readonly service = inject(InvoiceService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly unitService = inject(UnitService);
  private readonly storageService = inject(StorageService);
  private readonly activatedRoute = inject(ActivatedRoute);

  warehouses = toSignal(this.warehouseService.getAll(), {
    initialValue: [],
  });
  currencies = toSignal(this.currencyService.getCurrencies(), {
    initialValue: [],
  });
  isAdmin = this.storageService.isAdmin;
  invoiceType = signal<InvoiceTypeResponse>(window.history.state.invoiceType);
  total = signal(0);
  totalDisc = signal(0);
  totalExtra = signal(0);

  form = this.fb.group({
    warehouseId: this.fb.control<number>(
      this.storageService.warehouseId ??
        this.invoiceType().defaultWarehouseId ??
        1,
      Validators.required
    ),
    invoiceTypeId: [this.invoiceType().id],
    date: [this.currentDateTime, Validators.required],
    isSuspended: [false],
    accountId: [this.invoiceType().defaultCashAccId],
    currencyId: this.fb.control<number>(1, Validators.required),
    currencyValue: this.fb.control<number>(1, Validators.required),
    payType: [this.invoiceType().isCashBill ? 1 : 2, Validators.required],
    isPosted: [this.invoiceType().isAutoPost, Validators.required],
    postedDate: [
      this.invoiceType().isNoPost ? undefined : this.currentDateTime,
    ],
    notes: [''],
    invoiceItems: this.fb.array<
      FormGroup<{
        productId: FormControl<number>;
        qty: FormControl<number>;
        price: FormControl<number>;
        total: FormControl<number>;
        bonusQty: FormControl<number>;
        unitItemId: FormControl<number | undefined>;
        unitFact: FormControl<number | undefined>;
        notes: FormControl<string>;
      }>
    >([], Validators.required),
    invoiceDiscounts: this.fb.array<
      FormGroup<{
        account: FormControl<number>;
        discount: FormControl<number>;
        discountRate: FormControl<number>;
        extra: FormControl<number>;
        extraRate: FormControl<number>;
        notes: FormControl<string>;
      }>
    >([]),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      const navigation = window.history.state.invoiceType;
      if (navigation) {
        this.invoiceType.set(navigation);
      } else {
        window.history.back();
      }
    });

    this.form.controls.currencyId.valueChanges.subscribe((value) => {
      const curr = this.currencies().find((c) => c.id === value);
      this.form.controls.currencyValue.setValue(curr?.currencyValue ?? 1, {
        emitEvent: false,
      });
    });

    this.form.controls.currencyId.setValue(
      this.invoiceType().defaultCurrencyId ?? this.currencies()[0].id
    );
    this.initTheInvoiceDiscountRows();
    this.addInvoiceItem();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.invoiceItems.markAllAsTouched();
      this.invoiceDiscounts.markAllAsTouched();

      return;
    }

    this.service.create(this.form.getRawValue()).subscribe({
      next: (_) => this.form.reset(),
      error: (err) => console.error(err),
    });
  }

  get invoiceItems(): FormArray<FormGroup> {
    return this.form.get('invoiceItems') as FormArray<FormGroup>;
  }
  addInvoiceItem() {
    const row = this.fb.group({
      productId: this.fb.control<number | undefined>(
        undefined,
        Validators.required
      ),
      qty: this.fb.control<number>(0, Validators.min(0)),
      price: this.fb.control<number>(0, Validators.min(0)),
      total: this.fb.control<number>(0),
      bonusQty: this.fb.control<number>(0),
      unitItemId: this.fb.control<number | undefined>(undefined),
      unitFact: this.fb.control<number | undefined>(undefined),
      notes: [''],
    });

    row.controls.qty.valueChanges.subscribe((v) => {
      row.controls.total.setValue(v * row.controls.price.value, {
        emitEvent: false,
      });
      this.calcTotalInvoice();
    });

    row.controls.price.valueChanges.subscribe((v) => {
      row.controls.total.setValue(v * row.controls.qty.value, {
        emitEvent: false,
      });
      this.calcTotalInvoice();
    });

    this.invoiceItems.push(row);
    row.controls.unitItemId.valueChanges.subscribe((v) => {
      row.controls.unitFact.setValue(
        this.products()
          .at(this.invoiceItems.length - 1)
          ?.unitItems?.find((item) => {
            return item.id == v;
          })?.fact
      );
    });
  }
  removeInvoiceItem(i: number) {
    this.invoiceItems.removeAt(i);
  }

  get invoiceDiscounts(): FormArray<FormGroup> {
    return this.form.get('invoiceDiscounts') as FormArray<FormGroup>;
  }
  addInvoiceDiscount() {
    const row = this.fb.group({
      account: [],
      discount: [0],
      discountRate: [0],
      extra: [0],
      extraRate: [0],
      notes: [''],
    });
    this.listenToDiscountAndExtra(row);
    this.invoiceDiscounts.push(row);
  }
  removeInvoiceDiscount(i: number) {
    this.invoiceDiscounts.removeAt(i);
  }

  get currentDateTime(): string {
    return new Date().toISOString().slice(0, 16);
  }

  calcTotalInvoice() {
    let temp = 0;
    for (let item of this.invoiceItems.controls) {
      temp += +Number.parseFloat(item.controls['total'].value).toFixed(2);
    }
    this.total.set(temp);
  }
  calcTotalDiscountAndExtra() {
    let tempDisc = 0;
    let tempExtra = 0;
    for (let item of this.invoiceDiscounts.controls) {
      tempDisc += Number.parseFloat(item.controls['discount'].value);
      tempExtra += Number.parseFloat(item.controls['extra'].value);
    }

    this.totalDisc.set(tempDisc);
    this.totalExtra.set(tempExtra);
  }

  initTheInvoiceDiscountRows() {
    if (this.invoiceType().defaultDiscAccId) {
      const row = this.fb.group({
        account: [this.invoiceType().defaultDiscAccId],
        discount: [0],
        discountRate: [0],
        extra: [0],
        extraRate: [0],
        notes: [''],
      });
      this.listenToDiscountAndExtra(row);

      this.invoiceDiscounts.push(row);
    }

    if (this.invoiceType().defaultExtraAccId) {
      const row = this.fb.group({
        account: [this.invoiceType().defaultExtraAccId],
        discount: [0],
        discountRate: [0],
        extra: [0],
        extraRate: [0],
        notes: [''],
      });
      this.listenToDiscountAndExtra(row);
      this.invoiceDiscounts.push(row);
    }
  }

  listenToDiscountAndExtra(row: FormGroup) {
    row.controls['discount'].valueChanges.subscribe((v) => {
      let value = +((v * 100) / this.total()).toFixed(5);
      if (!isFinite(value)) {
        return;
      }

      row.controls['discountRate'].setValue(value, {
        emitEvent: false,
      });
      row.controls['extra'].setValue(0, { emitEvent: false });
      row.controls['extraRate'].setValue(0, { emitEvent: false });
      this.calcTotalDiscountAndExtra();
    });

    row.controls['discountRate'].valueChanges.subscribe((v) => {
      let value = +((v * this.total()) / 100).toFixed(2);
      if (!isFinite(value)) {
        return;
      }
      row.controls['discount'].setValue(value, {
        emitEvent: false,
      });
      row.controls['extra'].setValue(0, { emitEvent: false });
      row.controls['extraRate'].setValue(0, { emitEvent: false });
      this.calcTotalDiscountAndExtra();
    });

    row.controls['extra'].valueChanges.subscribe((v) => {
      let value = +((v * 100) / this.total()).toFixed(5);
      if (!isFinite(value)) {
        return;
      }
      row.controls['extraRate'].setValue(value, {
        emitEvent: false,
      });
      row.controls['discount'].setValue(0, { emitEvent: false });
      row.controls['discountRate'].setValue(0, { emitEvent: false });
      this.calcTotalDiscountAndExtra();
    });

    row.controls['extraRate'].valueChanges.subscribe((v) => {
      let value = +((v * this.total()) / 100).toFixed(2);
      if (!isFinite(value)) {
        return;
      }
      row.controls['extra'].setValue(value, {
        emitEvent: false,
      });
      row.controls['discount'].setValue(0, { emitEvent: false });
      row.controls['discountRate'].setValue(0, { emitEvent: false });
      this.calcTotalDiscountAndExtra();
    });
  }
  ds = Array();
  products = signal<
    {
      i: number;
      product: ProductResponse;
      unitItems: UnitItemResponse[];
    }[]
  >([]);
  onSelectProduct(product: ProductResponse, i: number) {
    this.unitService.getUnitById(product.defaultUnitId).subscribe((data) => {
      this.products.update((old) => {
        old[i] = { i, product, unitItems: data.unitItems ?? [] };
        return [...old];
      });
      this.invoiceItems.controls[i].controls['unitItemId'].setValue(
        data.unitItems.find((item) => {
          return item.isDef;
        })?.id
      );
    });
  }
}
