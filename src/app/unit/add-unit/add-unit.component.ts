import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../components/custom-field.component';
import { CardComponent } from '../../../components/card-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ValidationMessageComponent } from '../../../components/validation-message.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    CardComponent,
    MatTableModule,
    ValidationMessageComponent,
    MatIconModule,
  ],
  templateUrl: './add-unit.component.html',
})
export class AddUnitComponent {
  private fb = inject(FormBuilder);

  displayedColumns: string[] = ['name', 'fact', 'isDef', 'actions'];
  dataSource = new MatTableDataSource<AbstractControl>([]);

  form = this.fb.group({
    unitName: ['', Validators.required],
    units: this.fb.array([], Validators.required),
  });

  get units(): FormArray<FormGroup> {
    return this.form.get('units') as FormArray<FormGroup>;
  }

  createUnitRow(): FormGroup {
    const newRow = this.fb.group({
      name: ['', Validators.required],
      fact: [1, [Validators.required, Validators.min(1)]],
      isDef: [this.units.length === 0, [Validators.required]],
    });
    return newRow;
  }

  addRow(): void {
    const newItem = this.createUnitRow();
    this.units.push(newItem);
    this.updateTableData();
  }

  removeRow(index: number): void {
    if (this.units.at(index).get('isDef')?.value == true) {
      alert("can't delete default unit");
      return;
    }
    this.units.removeAt(index);
    this.updateTableData();
  }

  private updateTableData(): void {
    this.dataSource.data = this.units.controls;
  }

  changeIsDef(index: number) {
    this.units.controls.forEach((control, i) => {
      control.get('isDef')?.setValue(i === index);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted!');
      console.log(this.form.controls.units.at(0).get('isDef')?.value); // Use getRawValue to include disabled controls like 'total'
      console.log(this.form.getRawValue()); // Use getRawValue to include disabled controls like 'total'
      // Here you would typically send the data to a backend service
    } else {
      console.error('Form is invalid. Please check the fields.');
      // Optionally mark all fields as touched to show errors
      this.form.markAllAsTouched();
    }
  }
}
