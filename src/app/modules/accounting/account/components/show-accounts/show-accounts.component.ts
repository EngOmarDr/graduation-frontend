import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../service/account-service.service';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { BehaviorSubject, tap } from 'rxjs';
import { CustomTableComponent } from '../../../../shared/components/cust-table.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountResponse } from '../../models/response/account-response.model';

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

  displayedColumns: (keyof AccountResponse)[] = [
    'code',
    'name',
    'parentId',
    'finalAccount',
  ];
  private accountsSubject = new BehaviorSubject<AccountResponse[]>([]);
  accounts$ = this.accountsSubject.asObservable();
  filterValue: AccountResponse[] = [];

  ngOnInit() {
    this.accounts$ = this.accountService.getAccounts();
  }

  updateAccount(account: AccountResponse) {
    this.router.navigate(['update-account', account.id], {
      state: { account },
    });
  }

  deleteAccount(object: AccountResponse) {
    this.accountService.deleteAccount(object.id).subscribe({
      next: () => (this.accounts$ = this.accountService.getAccounts()),
    });
  }
}
