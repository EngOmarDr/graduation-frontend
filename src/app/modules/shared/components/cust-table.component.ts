import { Component, output, input } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TranslateModule],
  template: `
    <div class="overflow-auto max-h-96 relative">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th *ngFor="let col of columns()">
              {{ col }}
            </th>
            <th>{{ 'advertisements.actions' | translate }}</th>
          </tr>
        </thead>
        <tbody>
          @if (data()?.length == 0) {
          <tr>
            <td [attr.colspan]="columns().length + 2">
              {{ 'advertisements.empty' | translate }}
            </td>
          </tr>
          }
          <tr *ngFor="let row of data(); let i = index">
            <td>
              {{ i + 1 }}
            </td>
            <td *ngFor="let col of columns()">{{ row[col] }}</td>
            <td>
              <button
                type="button"
                (click)="deleteRow(row)"
                title="delete row"
                class="text-red-600 hover:text-red-800 cursor-pointer"
              >
                {{ 'advertisements.delete' | translate }}
              </button>
              <button
                type="button"
                (click)="editRow(row)"
                title="edit row"
                class="px-2 text-yellow-600 hover:text-yellow-800 cursor-pointer"
              >
                {{ 'advertisements.edit' | translate }}
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

  readonly data = input.required<T[] | null>();
  /**
   * يجب أن تكون نفس اسماء الحقول الخاصة بالكائن
   */
  readonly columns = input.required<(keyof T)[]>();
  readonly deleteRowEvent = output<T>();
  readonly updateRowEvent = output<T>();

  deleteRow(object: T) {
    this.deleteRowEvent.emit(object);
  }
  editRow(object: T) {
    this.updateRowEvent.emit(object);
  }
}
