import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="overflow-auto max-h-80 relative">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th *ngFor="let col of columns">
              {{ col }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @if (data?.length == 0) {
          <tr>
            <td [attr.colspan]="columns.length + 2">
              No Data Found
            </td>
          </tr>
          }
          <tr *ngFor="let row of data; let i = index">
            <td>
              {{ i + 1 }}
            </td>
            <td *ngFor="let col of columns">{{ row[col] }}</td>
            <td>
              <button
                type="button"
                (click)="deleteRow(row)"
                title="delete row"
                class="text-red-600 hover:text-red-800 cursor-pointer"
              >
                DELETE
              </button>
              <button
                type="button"
                (click)="editRow(row)"
                title="edit row"
                class="px-2 text-yellow-600 hover:text-yellow-800 cursor-pointer"
              >
                EDIT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomTableComponent<T> {
  constructor(public fb: NonNullableFormBuilder) {}

  @Input({ required: true }) data: T[] | null = null;
  /**
   * يجب أن تكون نفس اسماء الحقول الخاصة بالكائن
   */
  @Input({ required: true }) columns!: (keyof T)[];
  @Output() deleteRowEvent = new EventEmitter<T>();
  @Output() editRowEvent = new EventEmitter<T>();

  deleteRow(object: T) {
    this.deleteRowEvent.emit(object);
  }
  editRow(object: T) {
    this.editRowEvent.emit(object);
  }
}
