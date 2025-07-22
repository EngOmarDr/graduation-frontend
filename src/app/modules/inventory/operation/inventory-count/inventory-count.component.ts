import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../../../shared/components/card-form.component';
import { InventoryCountResponse } from '../models/inventory-count-response';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageService } from 'app/core/services/storage.service';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../product/services/product.service';
import { GroupService } from '../../group/services/group.service';
import { ProductSearchComponent } from '../../product/components/search-product/search-product.component';
import { OperationService } from '../services/operation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-count',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomSelectComponent,
    ProductSearchComponent,
    TranslateModule
  ],
  templateUrl: './inventory-count.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCountComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly warehouseService = inject(WarehouseService);
  private readonly service = inject(OperationService);
  private readonly productService = inject(ProductService);
  private readonly groupService = inject(GroupService);
  private readonly storageService = inject(StorageService);
  isAdmin = this.storageService.isAdmin;

  inventoryItems = signal<InventoryCountResponse | undefined>(undefined);
  currentCount: any;
  filterCategory: string = 'all';
  showUnprocessed: boolean = false;

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  groups = toSignal(this.groupService.getGroups(), { initialValue: [] });

  form = this.fb.group({
    warehouseId: this.fb.control<number | null>(
      this.storageService.warehouseId ?? null,
      Validators.required
    ),
    productId: this.fb.control<number | null>(null),
    groupId: this.fb.control<number | null>(null),
  });
  quantityForm = this.fb.group({
    quantityCounted: this.fb.array<number>([]),
  });
  get quantityCounted() {
    return this.quantityForm.controls.quantityCounted;
  }

  ngOnInit(): void {
    this.form.controls.productId.valueChanges.subscribe((value) => {
      if (value) {
        this.form.controls.groupId.setValue(null);
      } else {
        this.form.controls.groupId.enable({ emitEvent: false });
      }
    });
    this.form.controls.groupId.valueChanges.subscribe((value) => {
      if (value) {
        this.form.controls.productId.disable({ emitEvent: false });
      } else {
        this.form.controls.productId.enable({ emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.getInventoryItems(this.form.getRawValue()).subscribe((e) => {
      this.inventoryItems.set(e);

      for (let index = 0; index < e.items.length; index++) {
        this.quantityCounted.controls[index] = this.fb.control(
          e.items[index].quantity < 0 ? 0 : e.items[index].quantity
        );
      }
      // for (let item of e.items ?? []) {
      //   this.quantityCounted.push(
      //     this.fb.control(item.quantity < 0 ? 0 : item.quantity)
      //   );
      // }
    });
  }
}
