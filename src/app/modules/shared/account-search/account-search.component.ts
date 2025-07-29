import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  input,
  Input,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from 'app/modules/accounting/account/service/account-service.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessageComponent } from '../components/validation-message.component';
import { AcccountSearchModalComponent } from '../../accounting/account/components/acccount-search-modal/acccount-search-modal.component';
import { CommonModule } from '@angular/common';
import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-search',
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent,
    AcccountSearchModalComponent,
    CommonModule,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<form [formGroup]="form" (submit)="submitAccountSearch()">
    @if(label()){

    <label [for]="label()" class="cust-input-label">{{ label() }} </label>
    }
    <div class="flex">
      <input
        type="search"
        [formControl]="form.controls.accountName"
        class="cust-input rounded-e-none"
        id="{{ label() }}"
        [placeholder]="'accountS.searchPlaceholder' | translate"
      />

      <button class="btn rounded-s-none" type="submit">
        @if (isLoadingAccounts()) {
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        }@else {

        <span class="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        }
      </button>
    </div>
    <app-validation-message [control]="control!" [name]="label() ?? 'accountS.defaultLabel' | translate" />
    <div>
      <app-account-search-modal
        *ngIf="showModalAccount"
        [searchTerm]="
          this.form.controls.accountName.value.toString().search('-') == 0
            ? this.form.controls.accountName.value.toString()
            : this.form.controls.accountName.value.split('-')[0]
        "
        [accounts]="accounts()"
        (accountSelected)="onAccountSelected($event)"
        (closed)="showModalAccount = false"
      ></app-account-search-modal>
    </div>
  </form>`,
})
export class AccountSearchComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly accountService = inject(AccountService);
  private readonly toastr = inject(ToastrService);

  form = this.fb.group({
    accountName: [''],
    accountId: [''],
  });
  readonly label = input<string>();
  readonly fetch = input<boolean>(false);

  @Input({ required: true }) control!: AbstractControl;
  @Output() accountSelected = new EventEmitter<any>();

  isLoadingAccounts = signal(false);
  showModalAccount = false;
  accounts = signal<AccountResponse[]>([]);

  ngOnInit(): void {
    this.control.valueChanges.subscribe((v) => {
      if (!v) {
        this.form.reset();
      }
    });
    this.form.controls.accountName.valueChanges.subscribe((v) => {
      if (!v) {
        this.control.setValue(undefined, { emitEvent: false });
      }
    });
    if (this.fetch() && this.control.value) {
      this.isLoadingAccounts.set(true);
      this.accountService
        .getAccountById(this.control.value)
        .subscribe((next) => {
          this.onAccountSelected(next);
          this.isLoadingAccounts.set(false);
        });
    }
    this.form.controls.accountName.valueChanges.subscribe((value) => {
      if (value.toString().trim().length == 0) {
        this.control?.setValue(undefined);
        this.accountSelected.emit(undefined);
      }
    });
  }

  onAccountSelected(object: any) {
    this.form.controls.accountName!.setValue(object.code + '-' + object.name);
    this.form.controls.accountId!.setValue(object.id);
    this.control?.setValue(object.id);
    console.log(this.control.value);

    this.accountSelected.emit(object);
    this.showModalAccount = false;
  }

  submitAccountSearch() {
    const searchValue =
      this.form.controls.accountName.value.toString().search('-') == 0
        ? this.form.controls.accountName.value.toString()
        : this.form.controls.accountName.value.split('-')[0];

    if (!searchValue || searchValue.length === 0) {
      this.toastr.info('Enter value to search');
      return;
    }

    this.isLoadingAccounts.set(true);

    this.accountService.searchAccount(searchValue).subscribe({
      next: (next) => {
        this.accounts.set(next);

        this.isLoadingAccounts.set(false);

        if (next.length === 1) {
          this.onAccountSelected(next[0]);
        } else {
          this.showModalAccount = true;
        }
      },
      error: () => {
        this.isLoadingAccounts.set(false);
      },
    });
  }
}
