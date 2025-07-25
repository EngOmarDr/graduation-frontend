import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService } from 'app/modules/accounting/currency/services/currency.service';
import { Currency } from 'app/modules/accounting/currency/models/currency.model';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { InvoiceTypeService } from '../../services/invoice-type.service';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { PriceService } from 'app/modules/inventory/price/services/price.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomSelectComponent } from '../../../../shared/components/custom-select.component';
import { AcccountSearchModalComponent } from '../../../../accounting/account/components/acccount-search-modal/acccount-search-modal.component';
import { AccountSearchComponent } from '../../../../shared/account-search/account-search.component';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-invoiceType',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    CustomSelectComponent,
    AccountSearchComponent,
    TranslateModule
  ],
  templateUrl: './add-invoice-type.component.html',
})
export class AddInvoiceTypeComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(InvoiceTypeService);
  private readonly currencyService = inject(CurrencyService);
  private readonly priceService = inject(PriceService);
  private readonly warehouseService = inject(WarehouseService);

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

  onAccountSelected(object: any) {
    this.form.controls.defaultStockAccId.setValue(object.id);
  }

  form = this.fb.group({
    type: [1, Validators.required],
    name: ['', Validators.required],
    defaultPriceId: this.fb.control(undefined),
    minDefaultPriceId: [1],
    isAffectCostPrice: [true, Validators.required],
    isAffectLastPrice: [true, Validators.required],
    isAffectCustPrice: [true, Validators.required],
    isAffectProfit: [false, Validators.required],
    isDiscAffectCost: [true, Validators.required],
    isExtraAffectCost: [true, Validators.required],
    isNoEntry: [true, Validators.required],
    isAutoEntry: [false, Validators.required],
    isAutoEntryPost: [true, Validators.required],
    isNoPost: [false, Validators.required],
    isAutoPost: [true, Validators.required],
    defaultWarehouseId: [undefined],
    defaultBillAccId: [undefined],
    defaultCashAccId: [undefined],
    defaultDiscAccId: [undefined],
    defaultExtraAccId: [undefined],
    defaultCostAccId: [1],
    defaultStockAccId: [1],
    isShortEntry: [true],
    isCashBill: [true],
    printAfterInsert: [true],
    isBarcode: [true],
    defaultCurrencyId: [undefined],
  });

  ngOnInit() {
    this.form.controls.type.valueChanges.subscribe((v) => {
      switch (v) {
        case 1: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isAutoEntry.setValue(true);
          this.form.controls.isAutoPost.setValue(true);
          this.form.controls.isAffectCustPrice.setValue(true);
          this.form.controls.isAffectLastPrice.setValue(true);
          this.form.controls.isAffectCostPrice.setValue(true);
          this.form.controls.isDiscAffectCost.setValue(true);
          this.form.controls.isExtraAffectCost.setValue(true);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.isBarcode.setValue(true);
          this.form.controls.printAfterInsert.setValue(true);
          break;
        }
        case 2: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isAffectCustPrice.setValue(true);
          this.form.controls.isAffectCostPrice.setValue(false);
          this.form.controls.isDiscAffectCost.setValue(false);
          this.form.controls.isExtraAffectCost.setValue(false);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.isAutoEntry.setValue(true);
          this.form.controls.isAutoPost.setValue(true);
          break;
        }
        case 3: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isAffectCostPrice.setValue(false);
          this.form.controls.isDiscAffectCost.setValue(false);
          this.form.controls.isExtraAffectCost.setValue(false);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.printAfterInsert.setValue(true);
          this.form.controls.isAutoEntry.setValue(true);
          this.form.controls.isAutoPost.setValue(true);
          break;
        }
        case 4: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isDiscAffectCost.setValue(true);
          this.form.controls.isExtraAffectCost.setValue(true);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.printAfterInsert.setValue(true);
          this.form.controls.isAutoEntry.setValue(true);
          this.form.controls.isAutoPost.setValue(true);
          break;
        }
        case 5: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.printAfterInsert.setValue(true);
          this.form.controls.isAutoEntry.setValue(false);
          this.form.controls.isAutoPost.setValue(true);
          break;
        }
        case 6: {
          this.form.controls.isAutoEntryPost.setValue(true);
          this.form.controls.isCashBill.setValue(true);
          this.form.controls.isShortEntry.setValue(true);
          this.form.controls.printAfterInsert.setValue(true);
          this.form.controls.isAutoEntry.setValue(false);
          this.form.controls.isAutoPost.setValue(true);
          break;
        }
      }
    });
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
    this.service.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }
}
