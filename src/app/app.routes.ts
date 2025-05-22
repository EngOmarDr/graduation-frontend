import { Routes } from '@angular/router';
import { LayoutComponent } from '../app/modules/layout/layout.component';
import { LoginComponent } from '../app/modules/login/login.component';
import { ShowBranchesComponent } from '../app/modules/branch/show-branches/show-branches.component';
import { accountingRoutes } from '../app/modules/accounting/accounting.routes';
import { authGuard } from './core/guards/auth.guard';
import { ShowGroupsComponent } from './modules/inventory/group/show-groups/show-groups.component';
import { AddGroupComponent } from './modules/inventory/group/add-group/add-group.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { ShowUnitsComponent } from './modules/inventory/unit/show-units/show-units.component';
import { AddUnitComponent } from './modules/inventory/unit/add-unit/add-unit.component';
import { ShowPricesComponent } from './modules/inventory/price/show-prices/show-prices.component';
import { AddPriceComponent } from './modules/inventory/price/add-price/add-price.component';
import { ShowProductsComponent } from './modules/inventory/product/show-products/show-products.component';
import { AddProductComponent } from './modules/inventory/product/add-product/add-product.component';
import { ShowWarehousesComponent } from './modules/inventory/warehouse/show-warehouses/show-warehouses.component';
import { AddWarehouseComponent } from './modules/inventory/warehouse/add-warehouse/add-warehouse.component';
import { ShowPurchasesComponent } from './modules/inventory/purchases/show-purchases/show-purchases.component';
import { ShowSalesComponent } from './modules/inventory/sales/show-sales/show-sales.component';
import { BarcodePrintComponent } from './modules/inventory/barcode/barcode-print.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'groups',
            component: ShowGroupsComponent,
          },
          {
            path: 'add-group',
            component: AddGroupComponent,
          },
        ],
      },
      {
        path: 'branches',
        canActivate: [authGuard],
        children: [
          { path: '', component: ShowBranchesComponent },
          { path: 'add-branch', component: AddBranchComponent },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'units',
            component: ShowUnitsComponent,
          },
          {
            path: 'add-unit',
            component: AddUnitComponent,
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
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
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'products',
            component: ShowProductsComponent,
          },
          {
            path: 'add-product',
            component: AddProductComponent,
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
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
        canActivate: [authGuard],
        children: [
          {
            path: 'purchases',
            component: ShowPurchasesComponent,
          },
          {
            path: 'add-warehouse',
            component: AddWarehouseComponent,
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'sales',
            component: ShowSalesComponent,
          },
          {
            path: 'add-warehouse',
            component: AddWarehouseComponent,
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'printBarcode',
            component: BarcodePrintComponent,
          },
        ],
      },
      ...accountingRoutes,
    ],
  },
];
