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
import { AcccountSearchModalComponent } from "../acccount-search-modal/acccount-search-modal.component";
import { AccountResponse } from '../../models/response/account-response.model';

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
    AcccountSearchModalComponent
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
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    parentId: this.fb.control<number | undefined>(undefined),
    finalAccount: [1, [Validators.required]],
  });

  accounts$: Observable<AccountResponse[]> = of();

  finalAccounts = [
    { key: 1, value: 'الميزانية' },
    { key: 2, value: 'الأرباح و الخسائر' },
    { key: 3, value: 'المتاجرة' },
  ];

  showModal = true;

  onAccountSelected(group: any) {
    console.log('Selected group:', group);
    // Handle the selected group
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
    this.service.createAccount(this.form.value!).subscribe({
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
