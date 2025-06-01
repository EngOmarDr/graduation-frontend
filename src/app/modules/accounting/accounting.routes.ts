import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const accountingRoutes: Routes = [
  {
    path: 'add-account',
    loadComponent: () => import('./account/components/add-account/add-account.component').then(m => m.AddAccountComponent),
    canActivate: [authGuard],
  },
  {
    path: 'accounts',
    loadComponent: () => import('./account/components/show-accounts/show-accounts.component').then(m => m.ShowAccountsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'update-account/:id',
    loadComponent: () => import('./account/components/update-account/update-account.component').then(m => m.UpdateAccountComponent),
    canActivate: [authGuard],
  },

  {
    path: 'add-currency',
    loadComponent: () => import('./currency/add-currency/add-currency.component').then(m => m.AddCurrencyComponent),
    canActivate: [authGuard],
  },
  {
    path: 'update-currency/:id',
    loadComponent: () => import('./currency/update-currency/update-currency.component').then(m => m.UpdateCurrencyComponent),
    canActivate: [authGuard],
  },

  {
    path: 'currencies',
    loadComponent: () => import('./currency/show-currencies/show-currencies.component').then(m => m.ShowCurrenciesComponent),
    canActivate: [authGuard],
  },

  // {
  //   path: 'add-journal',
  //   // component: AddJournalComponent,
  //   canActivate: [authGuard],
  // },

  {
    path: 'paymentVoucher',
    canActivate: [authGuard],
    loadComponent: () => import('./payment-voucher/add/add-payment-voucher.component').then(m => m.AddPaymentVoucherComponent),
  },
];
