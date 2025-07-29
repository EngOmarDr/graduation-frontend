import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { CustomSelectComponent } from '../../../../shared/components/custom-select.component';
import { AccountService } from '../../service/account-service.service';
import { Subject } from 'rxjs';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute } from '@angular/router';
import { AccountResponse } from '../../models/response/account-response.model';
import { AcccountSearchModalComponent } from '../acccount-search-modal/acccount-search-modal.component';
import { CreateAccountRequest } from '../../models/request/create_account_request';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-update-account',
  imports: [
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    CommonModule,
    ValidationMessageComponent,
    NgSelectModule,
    AcccountSearchModalComponent,
    TranslateModule
  ],
  templateUrl: './update-account.component.html',
})
export class UpdateAccountComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private fb = inject(NonNullableFormBuilder);
  private service = inject(AccountService);
  private location = inject(Location);
  private activeRoute = inject(ActivatedRoute);

  accountId: String = '';
  account: AccountResponse | undefined;
  isLoadingSearch = signal(false);
  showModal = false;

  error: any;
  searchInput$ = new Subject<string>();
  form = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    parentId: this.fb.control<undefined | string>(undefined),
    finalAccount: [0, [Validators.required]],
  });
  parentAccount = this.fb.control<undefined | AccountResponse>(undefined);

  accounts: AccountResponse[] = window.history.state.accounts;

  finalAccounts = [
    { key: 1, value: 'الميزانية' },
    { key: 2, value: 'الأرباح و الخسائر' },
    { key: 3, value: 'المتاجرة' },
  ];
  onAccountSelected(object: any) {
    this.form.controls.parentId.setValue(object?.code + '-' + object?.name);
    this.parentAccount.setValue(object);
  }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id == null) {
      this.location.back();
    } else {
      this.accountId = id;
    }
    const navigation = window.history.state;
    if (navigation.account) {
      let account = this.accounts.find(
        (e) => e.id == navigation.account.parentId
      );
      let data = {
        ...navigation.account,
        parentId: account?.code + '-' + account?.name,
      };
      this.form.patchValue(data);
    } else {
      this.service
        .getAccountById(Number.parseInt(`${this.accountId}`))
        .subscribe({
          next: (next) => {
            let account = this.accounts.find((e) => e.id == next.parentId);
            let data = {
              ...next,
              parentId: account?.code + '-' + account?.name,
            };
            this.form.patchValue(data);
          },
          error: () => {
            this.location.back();
          },
        });
    }
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }
  onSubmit() {
    let data: CreateAccountRequest = {
      code: this.form.controls.code.value,
      name: this.form.controls.name.value,
      finalAccount: this.form.controls.finalAccount.value,
      parentId: this.parentAccount.value?.id,
    };
    console.log(data);

    this.service.updateAccount(this.accountId!, data).subscribe({
      next: () => {
        this.alert.showSuccess('updated');
        this.location.back();
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      },
    });
  }

  submitSearch() {
    if (
      (this.form.controls.parentId.value?.toString().trim().length ?? 0) == 0
    ) {
      alert('enter value to search');
      return;
    }
    this.isLoadingSearch.set(true);
    this.service
      .searchAccount(this.form.controls.parentId.value?.toString())
      .subscribe({
        next: (next) => {
          this.accounts = next;
          this.isLoadingSearch.set(false);
          if (next.length == 1) {
            this.parentAccount.setValue(next[0]);
            this.form.controls.parentId.setValue(
              next[0]?.code + '-' + next[0]?.name
            );
          } else {
            this.showModal = true;
          }
        },
      });
  }

  get parentAccountValue() {
    if (this.parentAccount.value?.code == undefined) {
      return '';
    }

    return (
      this.parentAccount.value?.code + '-' + this.parentAccount.value?.name
    );
  }
}
