import { Component, computed, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';
import { SettingsService } from '../settings.service';
import { InvoiceTypeService } from 'app/modules/inventory/invoice-type/services/invoice-type.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from "@shared/components/card-form.component";
import { CustomSelectComponent } from "@shared/components/custom-select.component";

@Component({
  selector: 'app-settings-pos',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, CardComponent, CustomSelectComponent],
  templateUrl: './settings-pos.component.html',
})
export class SettingsPosComponent {
  constructor(private alert: AlertService) {}

  private fb = inject(NonNullableFormBuilder);
  private location = inject(Location);
  private service = inject(SettingsService);
  invoiceTypes = inject(InvoiceTypeService).invoiceTypes;

  settings = toSignal(this.service.get(), { initialValue: [] });

  form = computed(() =>
    this.fb.group({
      invoiceTypeId: this.fb.control<number | null>(
        this.settings().at(0)?.invoiceTypeId ?? null,
        [Validators.required]
      ),
    })
  );

  onSubmit() {
    if (this.settings().length == 0) {
      this.service.create(this.form().getRawValue().invoiceTypeId!).subscribe({
        next: () => {
          this.alert.showSuccess('added');
          this.location.back();
        },
      });
    } else {
      this.service
        .update(
          this.settings().at(0)!.id,
          this.form().getRawValue().invoiceTypeId!
        )
        .subscribe({
          next: () => {
            this.alert.showSuccess('updated');
            this.location.back();
          },
        });
    }
  }
}
