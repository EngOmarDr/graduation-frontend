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
import { WarehouseResponse } from '../../models/response/warehouse-response.models';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    NgSelectModule,
    CustomFieldComponent,
    ValidationMessageComponent,
  ],
  templateUrl: './add-warehouse.component.html',
})
export class AddWarehouseComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  results = [];

  form = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    parentWarehouse: [''],
    address: [''],
    note: [''],
  });

  warehouses$: Observable<WarehouseResponse[]> = of();

  ngOnInit(): void {
    // this.warehouses$ = this.service.getwarehouses();
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  onSubmit() {
    alert(this.form.valid);
  }
}
