import { Routes } from '@angular/router';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { UpdateCurrencyComponent } from './currency/update-currency/update-currency.component';
import { ShowCurrenciesComponent } from './currency/show-currencies/show-currencies.component';
import { ShowAccountsComponent } from './account/show-accounts/show-accounts.component';
// import { AddJournalComponent } from './journal/add-journal/add-journal.component';
// import { AddPaymentVoucherComponent } from './payment-voucher/add/add-payment-voucher.component';
import { authGuard } from '../../core/guards/auth.guard';

export const accountingRoutes: Routes = [
  {
    path: 'add-account',
    component: AddAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accounts',
    component: ShowAccountsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'add-currency',
    component: AddCurrencyComponent,
    canActivate: [authGuard],
  },
 {
  path: 'update-currency/:id',
  component: UpdateCurrencyComponent,
  canActivate: [authGuard],
},

  {
    path: 'currencies',
    component: ShowCurrenciesComponent,
    canActivate: [authGuard],
  },

  // {
  //   path: 'add-journal',
  //   // component: AddJournalComponent,
  //   canActivate: [authGuard],
  // },

  // {
  //   path: 'paymentVoucher',
  //   canActivate: [authGuard],
  //   // component: AddPaymentVoucherComponent,
  // },
];
