import { Routes } from '@angular/router';
import { accountingRoutes } from '../app/modules/accounting/accounting.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/modules/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/modules/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        children: [
          {
            path: 'groups',
            loadComponent: () =>
              import(
                './modules/inventory/group/show-groups/show-groups.component'
              ).then((m) => m.ShowGroupsComponent),
          },
          {
            path: 'add-group',
            loadComponent: () =>
              import(
                './modules/inventory/group/add-group/add-group.component'
              ).then((m) => m.AddGroupComponent),
          },
          {
            path: 'update-group/:id',
            loadComponent: () =>
              import(
                './modules/inventory/group/update-group/update-group.component'
              ).then((m) => m.UpdateGroupComponent),
          },
        ],
      },
      {
        path: 'branches',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '../app/modules/branch/show-branches/show-branches.component'
              ).then((m) => m.ShowBranchesComponent),
          },
          {
            path: 'add-branch',
            loadComponent: () =>
              import('./modules/branch/add-branch/add-branch.component').then(
                (m) => m.AddBranchComponent
              ),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'units',
            loadComponent: () =>
              import(
                './modules/inventory/unit/show-units/show-units.component'
              ).then((m) => m.ShowUnitsComponent),
          },
          {
            path: 'add-unit',
            loadComponent: () =>
              import(
                './modules/inventory/unit/add-unit/add-unit.component'
              ).then((m) => m.AddUnitComponent),
          },
          {
            path: 'edit-unit/:id',
            loadComponent: () =>
              import(
                './modules/inventory/unit/update-unit/update-unit.component'
              ).then((m) => m.UpdateUnitComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'prices',
            loadComponent: () =>
              import(
                './modules/inventory/price/pages/show-prices/show-prices.component'
              ).then((m) => m.ShowPricesComponent),
          },
          {
            path: 'add-price',
            loadComponent: () =>
              import(
                './modules/inventory/price/pages/add-price/add-price.component'
              ).then((m) => m.AddPriceComponent),
          },
          {
            path: 'update-price/:id',
            loadComponent: () =>
              import(
                './modules/inventory/price/pages/add-price/add-price.component'
              ).then((m) => m.AddPriceComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'products',
            loadComponent: () =>
              import(
                './modules/inventory/product/show-products/show-products.component'
              ).then((m) => m.ShowProductsComponent),
          },
          {
            path: 'add-product',
            loadComponent: () =>
              import(
                './modules/inventory/product/add-product/add-product.component'
              ).then((m) => m.AddProductComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'warehouses',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/show-warehouses/show-warehouses.component'
              ).then((m) => m.ShowWarehousesComponent),
          },
          {
            path: 'add-warehouse',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/add-warehouse/add-warehouse.component'
              ).then((m) => m.AddWarehouseComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'purchases',
            loadComponent: () =>
              import(
                './modules/inventory/purchases/show-purchases/show-purchases.component'
              ).then((m) => m.ShowPurchasesComponent),
          },
          {
            path: 'add-warehouse',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/add-warehouse/add-warehouse.component'
              ).then((m) => m.AddWarehouseComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'sales',
            loadComponent: () =>
              import(
                './modules/inventory/sales/show-sales/show-sales.component'
              ).then((m) => m.ShowSalesComponent),
          },
          {
            path: 'add-warehouse',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/add-warehouse/add-warehouse.component'
              ).then((m) => m.AddWarehouseComponent),
          },
        ],
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'printBarcode',
            loadComponent: () =>
              import(
                './modules/inventory/barcode/barcode-print.component'
              ).then((m) => m.BarcodePrintComponent),
          },
        ],
      },
      ...accountingRoutes,
    ],
  },
];
