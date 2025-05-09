import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { ShowWarehousesComponent } from './warehouse/show-warehouses/show-warehouses.component';
import { ShowPricesComponent } from './price/show-prices/show-prices.component';
import { AddPriceComponent } from './price/add-price/add-price.component';
import { ShowGroupsComponent } from './group/show-groups/show-groups.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ShowProductsComponent } from './product/show-products/show-products.component';
import { ShowBranchesComponent } from './branch/show-branches/show-branches.component';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { ShowUnitsComponent } from './unit/show-units/show-units.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { BarcodePrintComponent } from './barcode/barcode-print.component';
import { ShowPurchasesComponent } from './purchases/show-purchases/show-purchases.component';
import { ShowSalesComponent } from './sales/show-sales/show-sales.component';
import { accountingRoutes } from './accounting/accounting.routes';
import {AddPaymentVoucherComponent} from './accounting/payment-voucher/add/add-payment-voucher.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
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
        children: [
          { path: '', component: ShowBranchesComponent },
          { path: 'add-branch', component: AddBranchComponent },
        ],
      },
      {
        path: '',
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
