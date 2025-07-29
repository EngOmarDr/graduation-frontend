import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';
import { BranchService } from 'app/modules/branch/services/branch.service';
import { WarehouseResponse } from '../../models/response/warehouse-response';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-update-warehouse',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
    CustomSelectComponent,
    NgSelectModule,
    TranslateModule
  ],
  templateUrl: './update-warehouse.component.html',
})
export class UpdateWarehouseComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly location = inject(Location);
  private readonly activeRoute = inject(ActivatedRoute);
  private service = inject(WarehouseService);
  private branchService = inject(BranchService);

  id = window.history.state.object.id!;
  state? = window.history.state.object as WarehouseResponse;

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }

  warehouses = toSignal(this.service.getAll(), { initialValue: [] });
  branches = toSignal(this.branchService.getBranches(), { initialValue: [] });

  types = [
    { key: 'POS', value: 'Pos' },
    { key: 'WAREHOUSE', value: 'Warehouse' },
  ];

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    type: this.fb.control<'POS' | 'WAREHOUSE'>('WAREHOUSE'),
    active: [false],
    branchId: [-1, Validators.required],
    parentId: this.fb.control<number | undefined>(undefined),
    phone: this.fb.control<string | undefined>(undefined),
    address: this.fb.control<string | undefined>(undefined),
    notes: [''],
  });
  ngOnInit() {
    this.loadStates();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.update(this.id, this.form.getRawValue()).subscribe({
      next: () => {
        this.alert.showSuccess('updated');
        this.location.back();
      },
    });
  }

  loadStates() {
    if (this.state) {
      this.form = this.fb.group({
        code: [this.state.code, Validators.required],
        name: [this.state.name, Validators.required],
        type: this.fb.control<'POS' | 'WAREHOUSE'>(this.state.type),
        active: [this.state.isActive],
        branchId: [this.state.branchId, Validators.required],
        parentId: [this.state.parentId],
        phone: [this.state.phone],
        address: [this.state.address],
        notes: [this.state.notes],
      });
    } else {
      this.service.getById(this.id).subscribe({
        next: (next) => {
          this.form = this.fb.group({
            code: [next.code, Validators.required],
            name: [next.name, Validators.required],
            type: [next.type],
            active: [next.isActive],
            branchId: [next.branchId, Validators.required],
            parentId: [next.parentId],
            phone: [next.phone],
            address: [next.address],
            notes: [next.notes],
          });
        },
        error: () => {
          this.location.back();
        },
      });
    }
  }
}
