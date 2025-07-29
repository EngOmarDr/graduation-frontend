import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { BranchService } from 'app/modules/branch/services/branch.service';
import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
import { UserService } from '../../service/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserResponse } from '../../models/response/user-response';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';
import { AlertService } from '@shared/services/alert.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-branch',
  imports: [
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomSelectComponent,
    TranslateModule
  ],
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(UserService);
  private readonly warehouseService = inject(WarehouseService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });
  object: UserResponse | undefined = window.history.state.object;
  id: number | null = +this.activatedRoute.snapshot.paramMap.get('id')!;

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    warehouseId: [-1, [Validators.required]],
    role: this.fb.control<'USER' | 'ADMIN'>('USER', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.id == null) {
      this.location.back();
      return;
    }

    if (this.object) {
      this.form.patchValue(this.object);
    } else {
      this.service.getUserById(this.id).subscribe({
        next: (next) => {
          this.form.patchValue(next);
        },
        error: () => {
          this.location.back();
        },
      });
    }
  }
  onSubmit() {
    this.service.update(this.form.getRawValue(), this.id!).subscribe({
      next: () => {
        this.alert.showSuccess('updated');
        this.location.back();
      },
    });
  }
}
