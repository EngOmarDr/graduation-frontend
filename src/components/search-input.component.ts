import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, AutocompleteLibModule],
  template: ` <div class="relative">
    <!-- Input with search icon -->
    <div class="relative">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange()"
        (focus)="showDropdown = true"
        (blur)="onBlur()"
        [placeholder]="placeholder"
        class="cust-input pl-10"
      />
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- Dropdown -->
    <div
      *ngIf="showDropdown"
      class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <!-- Loading state -->
      <div *ngIf="isLoading" class="p-4 text-center text-gray-500">
        Loading...
      </div>

      <!-- Results -->
      <ul *ngIf="!isLoading">
        <li
          *ngFor="let item of items"
          (click)="selectItem(item)"
          class="p-2 hover:bg-gray-100 cursor-pointer select-none"
          [class.bg-blue-50]="item === selectedItem"
        >
          {{ item[displayField] }}
        </li>
      </ul>

      <!-- Empty state -->
      <div
        *ngIf="!isLoading && items.length === 0"
        class="p-4 text-center text-gray-500"
      >
        No results found
      </div>
    </div>
  </div>`,
})
export class SearchInputComponent {
  @Input() apiUrl: string = 'http://jsonplaceholder.typicode.com/comments?userId=';
  @Input() placeholder: string = 'Search...';
  @Input() displayField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() limit: number = 10;
  @Output() itemSelected = new EventEmitter<any>();

  searchTerm: string = '';
  items: any[] = [];
  selectedItem: any = null;
  showDropdown: boolean = false;
  isLoading: boolean = false;

  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.fetchItems(term))
      )
      .subscribe({
        next: (results) => {
          this.items = results;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Search error:', err);
          this.isLoading = false;
        },
      });
  }

  onSearchChange(): void {
    this.isLoading = true;
    this.searchTerms.next(this.searchTerm);
  }

  fetchItems(searchTerm: string) {
    const params = {
      search: searchTerm,
      limit: this.limit.toString(),
    };
    return this.http.get<any[]>(this.apiUrl+searchTerm);
  }

  selectItem(item: any): void {
    this.selectedItem = item;
    this.searchTerm = item[this.displayField];
    this.showDropdown = false;
    this.itemSelected.emit(item);
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
}
