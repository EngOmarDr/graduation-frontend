import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { Observable, of } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { WarehouseResponse } from '../../models/response/warehouse-response';
import { WarehouseService } from '../../services/warehouse.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomSelectComponent } from "../../../../shared/components/custom-select.component";
import { BranchService } from 'app/modules/branch/services/branch.service';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    ValidationMessageComponent
],
  templateUrl: './add-warehouse.component.html',
})
export class AddWarehouseComponent {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(WarehouseService);
  private branchService = inject(BranchService);

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    type: this.fb.control<'POS' | 'WAREHOUSE'>('WAREHOUSE'),
    active: [false],
    branchId: [Validators.required],
    parentId: [undefined],
    phone: [''],
    address: [''],
    notes: [''],
  });

  types = [
    { key: 'POS', value: 'Pos' },
    { key: 'WAREHOUSE', value: 'Warehouse' },
  ];

  warehouses = toSignal(this.service.getAll(), { initialValue: [] });
  branches = toSignal(this.branchService.getBranches(), { initialValue: [] });

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }
}
