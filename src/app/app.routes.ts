import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { ShowCurrenciesComponent } from './currency/show-currencies/show-currencies.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cost-center',
        component: CostCenterComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'add-currency',
        component: AddCurrencyComponent,
      },
      {
        path: 'currencies',
        component: ShowCurrenciesComponent,
      },
    ],
  },
];
