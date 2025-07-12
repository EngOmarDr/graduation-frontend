import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  input,
  linkedSignal,
} from '@angular/core';
import { AccountResponse } from '../../models/response/account-response.model';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { AccountService } from '../../service/account-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-search-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './account-search-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcccountSearchModalComponent {
  private readonly service = inject(AccountService);

  @Output() accountSelected = new EventEmitter<AccountResponse>();
  @Output() closed = new EventEmitter<void>();
  @Input() searchTerm = '';
  readonly accounts = input<AccountResponse[]>([]);

  filteredAccounts = linkedSignal<AccountResponse[]>(() => this.accounts());
  sortByName = false;
  isLoading = signal(false);
  selectedAccount: AccountResponse | null = null;
  private searchTerms = new Subject<string>();

  ngOnInit() {
    // if (this.accounts.length == 0) {
    //   this.loadData();
    // }

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (term.trim().length == 0) {
            return [];
          }
          this.isLoading.set(true);
          return this.service.searchAccount(term).pipe(
            catchError(() => {
              this.isLoading.set(false);
              return of([]);
            })
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.filteredAccounts.set(data);
          this.sortData();
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error searching data:', err);
          this.isLoading.set(false);
        },
      });
  }

  loadData() {
    this.isLoading.set(true);
    this.service.searchAccount(this.searchTerm).subscribe({
      next: (value) => {
        this.filteredAccounts.set([...value]);
        this.sortData();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading.set(false);
      },
    });
  }

  onSearchChange(term: string) {
    this.searchTerms.next(term);
  }

  toggleSort() {
    this.sortByName = !this.sortByName;
    this.sortData();
  }

  sortData() {
    this.filteredAccounts.update((old) =>
      old.sort((a, b) => {
        if (this.sortByName) {
          return a.name.localeCompare(b.name);
        }
        return a.code.localeCompare(b.code);
      })
    );
  }

  selectAccount(account: AccountResponse) {
    this.selectedAccount = account;
  }

  confirmSelection(account?: AccountResponse) {
    if (account) {
      this.selectedAccount = account;
    }
    console.log(this.selectAccount);

    if (this.selectedAccount) {
      this.accountSelected.emit(this.selectedAccount);
      this.closeModal();
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
