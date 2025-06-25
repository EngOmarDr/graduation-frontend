import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
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

  accounts: AccountResponse[] = [];
  filteredAccounts = signal<AccountResponse[]>([]);
  searchTerm = '';
  sortByName = false;
  isLoading = signal(false);
  selectedAccount: AccountResponse | null = null;
  private searchTerms = new Subject<string>();

  ngOnInit() {
    this.loadGroups();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.searchAccounts(term).pipe(
            catchError((error) => {
              console.error('Search error:', error);
              this.isLoading.set(false);
              return of([]); // Return empty array on error
            })
          )
        )
      )
      .subscribe({
        next: (groups) => {
          this.filteredAccounts.set(groups);
          this.sortGroups();
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error searching groups:', err);
          this.isLoading.set(false);
        },
      });
  }

  loadGroups() {
    this.isLoading.set(true);
    this.service.searchAccount(this.searchTerm).subscribe({
      next: (groups) => {
        this.accounts = groups;
        this.filteredAccounts.set([...groups]);
        this.sortGroups();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading groups:', err);
        this.isLoading.set(false);
      },
    });
  }

  searchAccounts(term: string) {
    this.isLoading.set(true);
    if (!term.trim()) {
      return this.service.searchAccount();
    }
    return this.service.searchAccount(term);
  }

  onSearchChange(term: string) {
    this.searchTerms.next(term);
  }

  toggleSort() {
    this.sortByName = !this.sortByName;
    this.sortGroups();
  }

  sortGroups() {
    this.filteredAccounts.update((old) =>
      old.sort((a, b) => {
        if (this.sortByName) {
          return a.name.localeCompare(b.name);
        }
        return a.code.localeCompare(b.code);
      })
    );
  }

  selectGroup(account: AccountResponse) {
    this.selectedAccount = account;
  }

  confirmSelection(account?: AccountResponse) {
    if (account) {
      this.selectedAccount = account;
    }
    if (this.selectedAccount) {
      this.accountSelected.emit(this.selectedAccount);
      this.closeModal();
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
