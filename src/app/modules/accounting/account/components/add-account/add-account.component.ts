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
import { Observable, of, Subject } from 'rxjs';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AcccountSearchModalComponent } from '../acccount-search-modal/acccount-search-modal.component';
import { AccountResponse } from '../../models/response/account-response.model';
import { CreateAccountRequest } from '../../models/request/create_account_request';

@Component({
  selector: 'app-add-account',
  imports: [
    CardComponent,
    CustomFieldComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    CommonModule,
    ValidationMessageComponent,
    NgSelectModule,
    AcccountSearchModalComponent,
  ],
  templateUrl: './add-account.component.html',
})
export class AddAccountComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(AccountService);
  private location = inject(Location);
  error: any;
  searchInput$ = new Subject<string>();
  form = this.fb.group({
    code: [window.history.state.code??'', [Validators.required]],
    name: ['', [Validators.required]],
    parentId: this.fb.control<AccountResponse | null>(null),
    finalAccount: [1, [Validators.required]],
  });

  accounts$: Observable<AccountResponse[]> = of();
  accounts: AccountResponse[] = [];
  isLoadingSearch = signal(false);

  finalAccounts = [
    { key: 1, value: 'الميزانية' },
    { key: 2, value: 'الأرباح و الخسائر' },
    { key: 3, value: 'المتاجرة' },
  ];

  showModal = false;

  onAccountSelected(object: any) {
    this.form.controls.parentId.setValue(object);
  }

  ngOnInit(): void {
    this.accounts$ = this.service.getAccounts();
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
      parentId: this.form.controls.parentId.value?.id,
    };
    this.service.createAccount(data).subscribe({
      next: () => {
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
            this.form.controls.parentId.setValue(next[0]);
          } else {
            this.showModal = true;
          }
        },
      });
    console.log(this.form.controls.parentId.value);
  }

  get parentAccountValue() {
    if (this.form.controls.parentId.value?.code == undefined) {
      return '';
    }
    return (
      this.form.controls.parentId.value?.code +
      '-' +
      this.form.controls.parentId.value?.name
    );
  }
}
