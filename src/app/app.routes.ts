import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AddCategoryComponent as AddGroupComponent } from './category/add-category/add-category.component';
import { AddCurrencyComponent } from './currency/add-currency/add-currency.component';
import { ShowCurrenciesComponent } from './currency/show-currencies/show-currencies.component';
import { UpdateCurrencyComponent } from './currency/update-currency/update-currency.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { ShowWarehousesComponent } from './warehouse/show-warehouses/show-warehouses.component';
import { ShowPricesComponent } from './price/show-prices/show-prices.component';
import { AddPriceComponent } from './price/add-price/add-price.component';
import { ShowCategoriesComponent } from './category/show-categories/show-categories.component';

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
        path: '',
        children: [
          {
            path: 'groups',
            component: ShowCategoriesComponent,
          },
          {
            path: 'add-group',
            component: AddGroupComponent,
          },
        ],
      },
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
      {
        path: '',
        children: [
          {
            path: 'warehouses',
            component: ShowWarehousesComponent,
          },
          {
            path: 'add-warehouse',
            component: AddWarehouseComponent,
          },
        ],
      },
      {
        path: '',
        children: [
          {
            path: 'prices',
            component: ShowPricesComponent,
          },
          {
            path: 'add-price',
            component: AddPriceComponent,
          },
        ],
      },
    ],
  },
];
