import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../service/account-service.service';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { CustomTableComponent } from '../../../../shared/components/cust-table.component';
import { FormsModule } from '@angular/forms';
import { AccountResponse } from '../../models/response/account-response.model';
import {
  TreeNode,
  TreeViewComponent,
} from '@shared/components/tree-view.component';
import { AccountTreeResponse } from '../../models/response/account-tree-response';
import { HelperFunctionsService } from 'app/core/services/helper-functions.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-accounts',
  imports: [
    CardComponent,
    RouterModule,
    CustomTableComponent,
    FormsModule,
    TreeViewComponent,
    TranslateModule
  ],
  templateUrl: './show-accounts.component.html',
})
export class ShowAccountsComponent {
  constructor(private alert: AlertService) {}
  private accountService = inject(AccountService);
  private router = inject(Router);
  private helper = inject(HelperFunctionsService);

  treeView = false;
  treeData: TreeNode[] = [];

displayedColumns: (keyof AccountResponse)[] = [
  'code',
  'name',
  'parentName',
  'finalAccountName',
];


  accounts = linkedSignal(
    toSignal(this.accountService.getAccounts(), { initialValue: [] })
  );
  code = computed(() =>
    this.helper.addOneToString(
      this.accounts().at(this.accounts().length - 1)?.code ?? ''
    )
  );

  updateAccount(account: AccountResponse) {
    this.router.navigate(['update-account', account.id], {
      state: { account, accounts: this.accounts() },
    });
  }

  deleteAccount(object: AccountResponse) {
    this.accountService.deleteAccount(object.id).subscribe({
      next: () =>
        this.accounts.update((old) => {
          return old.filter((item) => item.id != object.id);
        }),
    });
    this.alert.showSuccess('deleted');
  }

  changeView(treeView: boolean) {
    if (this.treeData.length == 0) {
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
      .filter((account) => account.id !== undefined)
      .map((account) => {
        const node: TreeNode = {
          id: account.id as number,
          label: account.code + '-' + account.name,
          expanded: false,
        };
        if (account.children && account.children.length > 0) {
          node.children = this.convertAccountTreeToTreeNode(account.children);
        }
        return node;
      });
  }
}
