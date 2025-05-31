import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../service/account-service.service';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { Account } from '../../models/account';
import { BehaviorSubject, tap } from 'rxjs';
import { CustomTableComponent } from '../../../../shared/components/cust-table.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-accounts',
  imports: [
    CardComponent,
    RouterModule,
    CustomTableComponent,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './show-accounts.component.html',
})
export class ShowAccountsComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  displayedColumns: (keyof Account)[] = [
    'code',
    'name',
    'parentId',
    'finalAccount',
  ];
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();
  filterValue: Account[] = [];

  ngOnInit() {
    this.accounts$ = this.accountService.getAccounts();
  }

  updateAccount(account: Account) {
    this.router.navigate(['update-account', account.id], {
      state: { account },
    });
  }

  deleteAccount(object: Account) {
    this.accountService.deleteAccount(object.id).subscribe({
      next: () => (this.accounts$ = this.accountService.getAccounts()),
    });
  }
}
