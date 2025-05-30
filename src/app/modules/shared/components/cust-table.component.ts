import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="table-container overflow-auto max-h-[400px]">
  <table class="w-full border-collapse border border-gray-600 dark:border-gray-400">
    <thead class="bg-gray-100 dark:bg-gray-700 border border-gray-600 dark:border-gray-400">
      <tr>
        <th class="p-2 border border-gray-600 dark:border-gray-400 text-center">#</th>
        <th *ngFor="let col of columns" class="p-2 border border-gray-600 dark:border-gray-400 text-center">{{ col.label }}</th>
        <th class="p-2 border border-gray-600 dark:border-gray-400 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        *ngFor="let row of tableFormArray.controls; let i = index"
        [formGroup]="row"
        class="border border-gray-600 dark:border-gray-400"
      >
        <td class="border border-gray-600 dark:border-gray-400 text-center align-middle">{{ i + 1 }}</td>
        <td *ngFor="let col of columns" class="border border-gray-600 dark:border-gray-400 p-1 text-center align-middle">
          <input
            [formControlName]="col.key"
            [type]="col.type || 'text'"
            class="cust-input w-full"
          />
          <div *ngIf="row.get(col.key)?.invalid && (row.get(col.key)?.dirty || row.get(col.key)?.touched)" class="text-red-500 text-xs">
            هذا الحقل مطلوب وصحيح.
          </div>
        </td>
        <td class="border border-gray-600 dark:border-gray-400 text-center align-middle">
          <button
            type="button"
            (click)="removeRow(i)"
            title="حذف الصف"
            class="text-red-600 hover:text-red-800"
          >
            حذف
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="flex justify-center mt-2">
    <button
      type="button"
      (click)="addRow()"
      class="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      إضافة صف
    </button>
  </div>
</div>
`,
  styles: `.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #cbd5e1; /* gray-300 */
  border-radius: 4px;
}

.cust-input {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
`,
})
export class CustomTableComponent {
  constructor(public fb: NonNullableFormBuilder) {}  // حقن عبر الكونستركتور

  @Input() tableFormArray!: FormArray<FormGroup>;
  @Input() columns: { key: string; label: string; type?: string }[] = [];
  @Output() rowRemoved = new EventEmitter<number>();

  createRowGroup() {
    const group = this.fb.group({});
    this.columns.forEach(col => {
      group.addControl(
        col.key,
        this.fb.control('', col.key === 'debit' ? [Validators.required, Validators.min(0)] : Validators.required)
      );
    });
    return group;
  }

  addRow() {
    const newRow = this.createRowGroup();
    this.tableFormArray.push(newRow);
  }

  removeRow(index: number) {
    this.rowRemoved.emit(index);
  }
}
