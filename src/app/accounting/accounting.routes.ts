import { Routes } from '@angular/router';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { UpdateCurrencyComponent } from './currency/update-currency/update-currency.component';
import { ShowCurrenciesComponent } from './currency/show-currencies/show-currencies.component';
import { ShowAccountsComponent } from './account/show-accounts/show-accounts.component';

export const accountingRoutes: Routes = [
  { path: 'add-account', component: AddAccountComponent },
  { path: 'accounts', component: ShowAccountsComponent },
  {
    path: '',
    children: [
      { path: 'add-currency', component: AddCurrencyComponent },
      {
        path: 'update-currency',
        component: UpdateCurrencyComponent,
      },
      {
        path: 'currencies',
        component: ShowCurrenciesComponent,
      },
    ],
  },
];
