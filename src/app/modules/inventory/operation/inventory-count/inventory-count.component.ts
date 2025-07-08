import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../../../shared/components/card-form.component';
import { InventoryCountResponse } from '../models/inventory-count-response';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { StorageService } from 'app/core/services/storage.service';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { WarehouseService } from '../../warehouse/services/warehouse.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../product/services/product.service';
import { GroupService } from '../../group/services/group.service';

@Component({
  selector: 'app-inventory-count',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomSelectComponent,
  ],
  templateUrl: './inventory-count.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCountComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly warehouseService = inject(WarehouseService);
  private readonly productService = inject(ProductService);
  private readonly groupService = inject(GroupService);
  private readonly storageService = inject(StorageService);
  isAdmin = this.storageService.isAdmin;

  inventoryItems: InventoryCountResponse[] = [
    { productId: 1, productName: 'prkd', currentQuantity: 5 },
  ];
  currentCount: any;
  filterCategory: string = 'all';
  showUnprocessed: boolean = false;

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
  groups = toSignal(this.groupService.getGroups(), { initialValue: [] });

  form = this.fb.group({
    warehouseId: this.fb.control<number | string>(
      this.storageService.warehouseId ?? ''
    ),
    productId: this.fb.control(''),
    groupId: this.fb.control(''),
  });
  quantityForm = this.fb.group({
    quantityCounted: this.fb.array<FormControl>([]),
  });
  get quantityCounted(): FormArray<FormControl<any>> {
    return this.quantityForm.controls.quantityCounted;
  }

  ngOnInit(): void {
    this.form.controls.productId.valueChanges.subscribe((value) => {
      console.log(value);

      if (value) {
        this.form.controls.groupId.disable({emitEvent:false});
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
    this.loadDraftCount();
    this.loadInventoryItems();
    for (let item of this.inventoryItems) {
      this.quantityForm.controls.quantityCounted.push(
        this.fb.control(item.currentQuantity)
      );
    }
    console.log(this.form.value);
  }

  loadInventoryItems(): void {
    // this.countService.getInventoryItems().subscribe((items) => {
    //   this.inventoryItems = items;
    // });
  }

  loadDraftCount(): void {
    // this.countService.getDraftCount().subscribe((count) => {
    //   this.currentCount = count || this.countService.createNewCount();
    // });
  }

  onFileUpload(file: File): void {
    // this.countService.importCountFromFile(file).then((items) => {
    //   this.inventoryItems = items;
    // });
  }

  saveCount(): void {
    // this.countService.saveCount(this.currentCount).subscribe(() => {
    //   alert('تم حفظ سند الجرد بنجاح');
    // });
  }

  printExcelReport(): void {
    // this.countService.exportToExcel(this.currentCount);
  }

  calculateDifferences(): void {
    // this.countService.calculateDifferences(this.currentCount);
  }

  filterByCategory(event: string): void {
    this.filterCategory = event;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.onFileUpload(file);
    }
  }
}
