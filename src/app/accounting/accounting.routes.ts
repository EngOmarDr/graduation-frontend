import { Routes } from '@angular/router';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { UpdateCurrencyComponent } from './currency/update-currency/update-currency.component';
import { ShowCurrenciesComponent } from './currency/show-currencies/show-currencies.component';
import { ShowAccountsComponent } from './account/show-accounts/show-accounts.component';
import { AddJournalComponent } from './journal/add-journal/add-journal.component';
import { AddPaymentVoucherComponent } from './payment-voucher/add/add-payment-voucher.component';

export const accountingRoutes: Routes = [
  { path: 'add-account', component: AddAccountComponent },
  { path: 'accounts', component: ShowAccountsComponent },

  { path: 'add-currency', component: AddCurrencyComponent },
  { path: 'update-currency', component: UpdateCurrencyComponent },
  { path: 'currencies', component: ShowCurrenciesComponent },

  { path: 'add-journal', component: AddJournalComponent },

  {
    path: 'paymentVoucher',
    component: AddPaymentVoucherComponent,
  },
];
