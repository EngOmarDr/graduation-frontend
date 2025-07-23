import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { UnitService } from '../../services/unit.service';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CardComponent,
    ValidationMessageComponent,
    TranslateModule
  ],
  templateUrl: './add-unit.component.html',
})
export class AddUnitComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly unitService = inject(UnitService);
  private readonly toastr = inject(ToastrService);

  form = this.fb.group({
    name: ['', Validators.required],
    unitItems: this.fb.array(
      [
        this.fb.group({
          name: ['', Validators.required],
          fact: this.fb.control<number>(1, [Validators.min(0)]),
          isDef: [true],
        }),
      ],
      Validators.required
    ),
  });

  get unitItems(): FormArray<FormGroup> {
    return this.form.get('unitItems') as FormArray<FormGroup>;
  }

  addRow(): void {
    const item = this.fb.group({
      name: ['', Validators.required],
      fact: this.fb.control<number>(1, [
        Validators.required,
        Validators.min(0),
      ]),
      isDef: [this.unitItems.length === 0],
    });
    this.unitItems.push(item);
  }

  removeRow(index: number): void {
    const row = this.unitItems.at(index);
    if (row.get('isDef')?.value === true) {
      alert("Can't delete default unit");
      return;
    }
    this.unitItems.removeAt(index);
    if (this.unitItems.length > 0) {
      this.unitItems.at(0).get('fact')?.setValue(1);
    }
  }

  changeIsDef(index: number): void {
    this.unitItems.controls.forEach((control, i) => {
      control.get('isDef')?.setValue(i === index);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.unitService.createUnit(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastr.success('added successfully');
        this.form.reset();
      },
    });
  }
}
