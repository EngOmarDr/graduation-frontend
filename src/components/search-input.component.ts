import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ValidationMessageComponent } from './validation-message.component';

@Component({
  selector: 'app-search-input',
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ValidationMessageComponent,
  ],
  template: `
    <div>
      <label
        [for]="label"
        class="cust-input-label"
        [ngClass]="{
          'cust-label-disable': control.disabled
        }"
        >{{ label }}
      </label>
      <ng-select
        [items]="filteredOptions"
        bindLabel="name"
        placeholder=""
        [typeahead]="searchInput$"
        formControlName="controlName"
        (change)="onSelect($event)"
        class="cust-input"
      >
        <!-- <ng-template
      ng-option-tmp
      let-item="item"
      let-index="index"
      let-search="searchTerm"
    >
      <div>{{ item.name }}</div>
    </ng-template> -->
      </ng-select>
      <!-- <input
        [id]="label"
        [formControl]="formControl"
        type="{{ type }}"
        class="cust-input"
        [readOnly]="readOnly"
      /> -->
      <app-validation-message
        [control]="control"
        [customMessage]="null"
        name="{{ label }}"
      />
    </div>
  `,
})
export class SearchInputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) control!: AbstractControl;
  @Input() type: string = 'text';
  @Input() readOnly: boolean = false;
  @Input() customMessage: string | null = null;
  get formControl(): FormControl {
    return this.control as FormControl;
  }

  filteredOptions: any[] = [];
  searchInput$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          this.http.get<any[]>(
            `http://jsonplaceholder.typicode.com/comments?userId=${term}`
          )
        )
      )
      .subscribe((data) => (this.filteredOptions = data));
  }

  onSelect(option: any) {
    console.log('Selected:', option);
  }
}
