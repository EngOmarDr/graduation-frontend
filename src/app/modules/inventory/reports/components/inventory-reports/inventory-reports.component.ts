import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CardComponent } from '../../../../shared/components/card-form.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { ActivatedRoute } from '@angular/router';
import {
  AccountingReportsKeys,
  InventoryReportsKeys,
} from 'app/core/constants/constant';
import { ProductSearchComponent } from '../../../product/components/search-product/search-product.component';
import { InventoryReportsService } from '../../services/inventory-reports.service';
import { DailyMovementResponse } from '../../models/response/daily-movement-response';
import { ItemMovementResponse } from '../../models/response/item-movement-response';
import { StockReportResponse } from '../../models/response/stock-report-response';
import { StorageService } from 'app/core/services/storage.service';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { CommonModule } from '@angular/common';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GroupService } from 'app/modules/inventory/group/services/group.service';

@Component({
  selector: 'app-daily-movement',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    CustomFieldComponent,
    ProductSearchComponent,
    CustomSelectComponent,
    CommonModule,
  ],
  templateUrl: './inventory-reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyMovementComponent {
  private readonly service = inject(InventoryReportsService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly storage = inject(StorageService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly groupService = inject(GroupService);
  private readonly activatedRoute = inject(ActivatedRoute);
  isAdmin = this.storage.isAdmin;

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });
  groups = toSignal(this.groupService.getGroups(), { initialValue: [] });
  typeReport =
    signal<(typeof InventoryReportsKeys)[keyof typeof InventoryReportsKeys]>(
      'daily-movement'
    );
  date = new Date();
  currentDate = this.date.toISOString().split('T')[0];
  firstDayOfYear = new Date(this.date.getFullYear(), 0, 2)
    .toISOString()
    .split('T')[0];

  form = this.fb.group({
    startDate: [this.firstDayOfYear, [Validators.required]],
    endDate: [this.currentDate, [Validators.required]],
    productId: [undefined],
    groupId: [undefined],
    warehouseId: [this.storage.warehouseId],
  });
  dailyMovement = signal<DailyMovementResponse | undefined>(undefined);
  itemMovement = signal<ItemMovementResponse[] | undefined>(undefined);
  itemStock = signal<StockReportResponse | undefined>(undefined);
  isPrintDisable = computed(
    () => !this.dailyMovement() && !this.itemMovement() && !this.itemStock()
  );
  balance = [0];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.dailyMovement.set(undefined);
      this.itemMovement.set(undefined);
      this.itemStock.set(undefined);
      this.typeReport.set(params['name']);

      if (this.typeReport() == InventoryReportsKeys.ItemMovement) {
        this.form.controls.productId.addValidators(Validators.required);
      } else {
        this.form.controls.productId.removeValidators(Validators.required);
      }
      //   this.form = this.fb.group({
      //     accountId: ['', [Validators.required]],
      //     accountName: ['', [Validators.required]],
      //     startDate: ['', [Validators.required]],
      //     endDate: ['', [Validators.required]],
      //   });
      // } else {
      //   this.form = this.fb.group({
      //     startDate: ['', [Validators.required]],
      //     endDate: ['', [Validators.required]],
      //   });
      // }
    });
    this.form.controls.productId.valueChanges.subscribe((v) => {
      if (v) this.form.controls.groupId.setValue(undefined);
    });
    this.form.controls.groupId.valueChanges.subscribe((v) => {
      if (v) this.form.controls.productId.setValue(undefined);
    });
  }

  onSubmit() {
    if (this.typeReport() == InventoryReportsKeys.DailyMovement) {
      this.service
        .dailyMovementReport(this.form.getRawValue())
        .subscribe((e) => {
          this.dailyMovement.set(e);
        });
    } else if (this.typeReport() == InventoryReportsKeys.ItemMovement) {
      this.service
        .itemMovementReport(this.form.getRawValue())
        .subscribe((e) => {
          this.itemMovement.set(e);
          this.itemMovement()
            ?.at(0)
            ?.items.map((e, i) => {
              let isSum = e.movementType == 'INBOUND' ? true : false;
              this.balance[i] =
                (this.balance.at(i - 1) ?? 0) +
                (isSum ? e.quantity : -e.quantity);
            });
        });
    } else {
      this.service.stockReport(this.form.getRawValue()).subscribe((e) => {
        this.itemStock.set(e);
      });
    }
  }

  printReport(): void {
    const printContents = document.getElementById('report')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }

  // get firstDayInYear() {
  //   let year = new Date().getUTCFullYear();
  //   return new Date(year).toISOString().split('T')[0];
  // }

  // search account card
}
