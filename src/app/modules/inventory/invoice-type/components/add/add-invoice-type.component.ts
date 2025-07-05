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
    minDefaultPriceId: [undefined],
    isAffectCostPrice: [false, Validators.required],
    isAffectLastPrice: [false, Validators.required],
    isAffectCustPrice: [false, Validators.required],
    isAffectProfit: [false, Validators.required],
    isDiscAffectCost: [false, Validators.required],
    isExtraAffectCost: [false, Validators.required],
    isNoEntry: [false, Validators.required],
    isAutoEntry: [false, Validators.required],
    isAutoEntryPost: [false, Validators.required],
    isNoPost: [false, Validators.required],
    isAutoPost: [false, Validators.required],
    defaultWarehouseId: [undefined],
    defaultBillAccId: [undefined],
    defaultCashAccId: [undefined],
    defaultDiscAccId: [undefined],
    defaultExtraAccId: [undefined],
    defaultCostAccId: [undefined],
    defaultStockAccId: [undefined],
    isShortEntry: [false],
    isCashBill: [false],
    printAfterInsert: [false],
    isBarcode: [false],
    defaultCurrencyId: [undefined],
  });

  onSubmit() {
    console.log(this.form.value);

    this.service.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }
}
