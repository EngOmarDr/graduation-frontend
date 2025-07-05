import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CustomSelectComponent } from '@shared/components/custom-select.component';
import { RouterModule } from '@angular/router';
import { BranchService } from 'app/modules/branch/services/branch.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { WarehouseService } from 'app/modules/inventory/warehouse/services/warehouse.service';

@Component({
  selector: 'app-add-user',
  imports: [
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(UserService);
  private readonly warehouseService = inject(WarehouseService);
  warehouses = toSignal(this.warehouseService.getAll(), { initialValue: [] });

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    warehouseId: [undefined, [Validators.required]],
    role: this.fb.control<'USER'>('USER', [Validators.required]),
  });

  onSubmit() {
    this.service.createUser(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }
}
