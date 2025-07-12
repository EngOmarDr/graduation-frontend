import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../service/account-service.service';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { BehaviorSubject, map, tap } from 'rxjs';
import { CustomTableComponent } from '../../../../shared/components/cust-table.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountResponse } from '../../models/response/account-response.model';
import {
  TreeNode,
  TreeViewComponent,
} from '@shared/components/tree-view.component';
import { AccountTreeResponse } from '../../models/response/account-tree-response';

@Component({
  selector: 'app-show-accounts',
  imports: [
    CardComponent,
    RouterModule,
    CustomTableComponent,
    AsyncPipe,
    FormsModule,
    TreeViewComponent,
  ],
  templateUrl: './show-accounts.component.html',
})
export class ShowAccountsComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  treeView = false;
  treeData: TreeNode[] = [];

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
    this.accounts$.subscribe((accounts) => {
      this.router.navigate(['update-account', account.id], {
        state: { account, accounts },
      });
    });
  }

  deleteAccount(object: AccountResponse) {
    this.accountService.deleteAccount(object.id).subscribe({
      next: () => (this.accounts$ = this.accountService.getAccounts()),
    });
  }

  changeView(treeView: boolean) {
    if (this.treeData.length==0 ) {
      this.accountService.getAccountsTree().subscribe((e) => {
        this.treeData = this.convertAccountTreeToTreeNode(e);
        this.treeView = treeView;
      });
    } else {
      this.treeView = treeView;
    }
  }

  convertAccountTreeToTreeNode(accounts: AccountTreeResponse[]): TreeNode[] {
    return accounts
      .filter((account) => account.id !== undefined) // Ensure id is defined since TreeNode requires id
      .map((account) => {
        const node: TreeNode = {
          id: account.id as number,
          label: account.code+ '-' + account.name,
          expanded: false,
        };
        if (account.children && account.children.length > 0) {
          node.children = this.convertAccountTreeToTreeNode(account.children);
        }
        return node;
      });
  }
}
