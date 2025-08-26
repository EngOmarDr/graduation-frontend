import { Component, output, input } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SweetAlert2Module],
  template: `
    <div class="overflow-auto max-h-96 relative">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th *ngFor="let col of columns()">
  {{ translateColumn(col) | translate }}
</th>
            <th>{{ 'groups.actions' | translate }}</th>
          </tr>
        </thead>
        <tbody>
          @if (data()?.length == 0) {
          <tr>
            <td [attr.colspan]="columns().length + 2">
              {{ 'groups.empty' | translate }}
            </td>
          </tr>
          }
          <tr *ngFor="let row of data(); let i = index">
            <td>
              {{ i + 1 }}
            </td>
            <td *ngFor="let col of columns()">
  {{ row[col] ?? '' }}
</td>
            <td>
              <button
                type="button"
                [swal]="[
                  'invoiceType.delete' | translate,
                  ('invoiceType.confirmDelete' | translate) + ' '
                ]"
                (confirm)="deleteRow(row)"
                title="delete row"
                class="text-red-600 hover:text-red-800 cursor-pointer"
              >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#f87171"
                viewBox="0 0 448 512"
                width="16"
                height="16"
              >
                <path
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                />
              </svg>
              </button>
              <button
                type="button"
                (click)="editRow(row)"
                title="edit row"
                class="px-2 text-yellow-600 hover:text-yellow-800 cursor-pointer"
              >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#facc15"
                viewBox="0 0 512 512"
                width="16"
                height="16"
              >
                <path
                  d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"
                />
              </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomTableComponent<T> {
  constructor(public fb: NonNullableFormBuilder) { }

  readonly data = input.required<T[] | null>();
  readonly columns = input.required<(keyof T)[]>();
  readonly deleteRowEvent = output<T>();
  readonly updateRowEvent = output<T>();

  deleteRow(object: T) {
    this.deleteRowEvent.emit(object);
  }
  editRow(object: T) {
    this.updateRowEvent.emit(object);
  }
  translateColumn(col: keyof T): string {
    return `groups.columns.${String(col)}`;
  }
}
