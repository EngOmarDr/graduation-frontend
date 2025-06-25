import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AccountResponse } from '../../models/response/account-response.model';

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
  ],
  templateUrl: './update-account.component.html',
})
export class UpdateAccountComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(AccountService);
  private location = inject(Location);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  accountId: String = '';
  account: AccountResponse | undefined;

  error: any;
  searchInput$ = new Subject<string>();
  form = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    parentId: this.fb.control<undefined | number>(undefined),
    finalAccount: [0, [Validators.required]],
  });

  accounts$: Observable<AccountResponse[]> = of();

  finalAccounts = [
    { key: 1, value: 'الميزانية' },
    { key: 2, value: 'الأرباح و الخسائر' },
    { key: 3, value: 'المتاجرة' },
  ];

  ngOnInit(): void {
    this.accounts$ = this.service.getAccounts();
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id == null) {
      this.location.back();
    } else {
      this.accountId = id;
    }
    const navigation = window.history.state;
    if (navigation.account) {
      this.form.patchValue(navigation.account);
    } else {
      this.service
        .getAccountById(Number.parseInt(`${this.accountId}`))
        .subscribe({
          next: (next) => {
            this.form.patchValue(next);
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
    this.service.updateAccount(this.accountId!, this.form.value).subscribe({
      next: () => {
        this.location.back();
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      },
    });
  }
}
