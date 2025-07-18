import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { InvoiceTypeService } from '../../services/invoice-type.service';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { PriceService } from 'app/modules/inventory/price/services/price.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { AccountSearchComponent } from '@shared/account-search/account-search.component';
import { WarehouseResponse } from 'app/modules/inventory/warehouse/models/response/warehouse-response';
import { InvoiceTypeResponse } from '../../models/response/invoice-type-response';

@Component({
  selector: 'app-update-invoiceType',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    CustomSelectComponent,
    AccountSearchComponent,
  ],
  templateUrl: './update-invoice-type.component.html',
})
export class UpdateInvoiceTypeComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(InvoiceTypeService);
  private readonly currencyService = inject(CurrencyService);
  private readonly priceService = inject(PriceService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly location = inject(Location);

  id = window.history.state.object.id!;
  state = window.history.state.object as InvoiceTypeResponse;

  prices = toSignal(this.priceService.getPrices(), { initialValue: [] });
  warehouses = toSignal(this.warehouseService.getAll(), {
    initialValue: [],
  });
  currencies = toSignal(this.currencyService.getCurrencies(), {
    initialValue: [],
  });

  readonly invoiceTypes = [
    { id: 1, name: 'buy' },
    { id: 2, name: 'sale' },
    { id: 3, name: 'retrieve buy' },
    { id: 4, name: 'retrieve sale' },
    { id: 5, name: 'input' },
    { id: 6, name: 'output' },
  ];

  convertToNum(value: string | number): number {
    switch (value) {
      case 'buy':
        return 1;
      case 'sale':
        return 2;
      case 'retrieve buy':
        return 3;
      case 'retrieve sale':
        return 4;
      case 'input':
        return 5;
      case 'output':
        return 6;
      default:
        return 0;
    }
  }

  onAccountSelected(object: any) {
    this.form.controls.defaultStockAccId.setValue(object.id);
  }

  form = this.fb.group({
    type: [this.convertToNum(this.state?.type), Validators.required],
    name: [this.state?.name, Validators.required],
    defaultPriceId: this.fb.control(this.state?.defaultPriceId),
    minDefaultPriceId: [this.state?.minDefaultPriceId],
    isAffectCostPrice: [this.state?.isAffectCostPrice, Validators.required],
    isAffectLastPrice: [this.state?.isAffectLastPrice, Validators.required],
    isAffectCustPrice: [this.state?.isAffectCustPrice, Validators.required],
    isAffectProfit: [this.state?.isAffectProfit, Validators.required],
    isDiscAffectCost: [this.state?.isDiscAffectCost, Validators.required],
    isExtraAffectCost: [this.state?.isExtraAffectCost, Validators.required],
    isNoEntry: [this.state?.isNoEntry, Validators.required],
    isAutoEntry: [this.state?.isAutoEntry, Validators.required],
    isAutoEntryPost: [this.state?.isAutoEntryPost, Validators.required],
    isNoPost: [this.state?.isNoPost, Validators.required],
    isAutoPost: [this.state?.isAutoPost, Validators.required],
    defaultWarehouseId: [this.state?.defaultWarehouseId],
    defaultBillAccId: [this.state?.defaultBillAccId],
    defaultCashAccId: [this.state?.defaultCashAccId],
    defaultDiscAccId: [this.state?.defaultDiscAccId],
    defaultExtraAccId: [this.state?.defaultExtraAccId],
    defaultCostAccId: [this.state?.defaultCostAccId],
    defaultStockAccId: [this.state?.defaultStockAccId],
    isShortEntry: [this.state?.isShortEntry],
    isCashBill: [this.state?.isCashBill],
    printAfterInsert: [this.state?.printAfterInsert],
    isBarcode: [this.state?.isBarcode],
    defaultCurrencyId: [this.state?.defaultCurrencyId],
  });

  ngOnInit(): void {
    console.log(this.form.controls.type.value);

    this.form.controls.isNoEntry.valueChanges.subscribe((e) => {
      if (e) {
        this.form.controls.isAutoEntry.setValue(false, { emitEvent: false });
      }
    });
    this.form.controls.isAutoEntry.valueChanges.subscribe((e) => {
      if (e) {
        this.form.controls.isNoEntry.setValue(false, { emitEvent: false });
      }
    });
    this.form.controls.isNoPost.valueChanges.subscribe((e) => {
      if (e) {
        this.form.controls.isAutoPost.setValue(false, { emitEvent: false });
      }
    });
    this.form.controls.isAutoPost.valueChanges.subscribe((e) => {
      if (e) {
        this.form.controls.isNoPost.setValue(false, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    console.log(this.state);

    this.service.update(this.id, this.form.getRawValue()).subscribe({
      next: () => {
        this.location.back();
      },
    });
  }
}
