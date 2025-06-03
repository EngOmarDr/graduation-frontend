import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { CardComponent } from '../../../shared/components/card-form.component';
import { UnitService } from '../services/unit.service';
import { Unit } from '../models/unit.model';
import { UnitItemService } from '../services/unit-item.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CardComponent,
  ],
  templateUrl: './add-unit.component.html',
})


export class AddUnitComponent {

  constructor() {
  this.addRow();
}
  private fb = inject(NonNullableFormBuilder);
  private unitService = inject(UnitService);
  private unitItemService = inject(UnitItemService);

displayedColumns: string[] = ['#', 'name', 'fact', 'isDef', 'actions'];

    form = this.fb.group({
      unitName: ['', Validators.required],
      units: this.fb.array([], Validators.required),
    });

  get units(): FormArray<FormGroup> {
    return this.form.get('units') as FormArray<FormGroup>;
  }

  createUnitRow(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      fact: this.fb.control<number | null>(this.units.length === 0 ? 1 : null, [
        Validators.required,
        Validators.min(1),
      ]),
      isDef: [this.units.length === 0],
    });
  }

  addRow(): void {
    this.units.push(this.createUnitRow());
    this.updateTableData();
  }

  removeRow(index: number): void {
    const row = this.units.at(index);
    if (row.get('isDef')?.value === true) {
      alert("Can't delete default unit");
      return;
    }
    this.units.removeAt(index);
    if (this.units.length > 0) {
      this.units.at(0).get('fact')?.setValue(1);
    }
    this.updateTableData();
  }

  private updateTableData(): void {
    // this.dataSource.data = this.units.controls;
  }

  changeIsDef(index: number): void {
    this.units.controls.forEach((control, i) => {
      control.get('isDef')?.setValue(i === index);
    });
  }

onSubmit(): void {
  this.form.markAllAsTouched();

  if (this.form.invalid) {
    // this.snackBar.open('Please fill out all required fields.', 'Close', {
    //   duration: 3000,
    // });
    return;
  }

  const unit: Unit = {
    name: this.form.value.unitName!,
    unitItems: [],
  };

  this.unitService.createUnit(unit).subscribe({
    next: (createdUnit) => {
      const unitId = createdUnit.id;

      const unitItems = this.units.getRawValue().map((item: any) => ({
        name: item.name,
        fact: item.fact,
        isDef: Boolean(item.isDef),
        unitId: unitId,
      }));

      const requests = unitItems.map((item) =>
        this.unitItemService.createUnitItem(item)
      );


      forkJoin(requests).subscribe({
        next: () => {
          // this.snackBar.open('Unit and its items created successfully!', 'Close', {
          //   duration: 3000,
          // });
          this.form.reset();
          this.units.clear();
          this.addRow();
        },
        error: (err) => {
          console.error(err);
          // this.snackBar.open('Error creating unit items.', 'Close', {
          //   duration: 3000,
          // });
        },
      });
    },
    error: (err) => {
      console.error(err);
      // this.snackBar.open('Error creating unit.', 'Close', {
      //   duration: 3000,
      // });
    },
  });
}
}
