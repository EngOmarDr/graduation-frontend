import { Routes } from '@angular/router';
import { accountingRoutes } from '../app/modules/accounting/accounting.routes';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { inventoryRoutes } from './modules/inventory/inventory.routes';

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
      import('../app/modules/layout/components/layout.component').then(
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
        path: 'advertisements',
        canActivate: [authGuard],
        children: [
          {
            path: 'add-advertisement',
            loadComponent: () =>
              import(
                './modules/price-display/components/add-advertisement/add-advertisement-component.component'
              ).then((m) => m.AddAdvertisementComponentComponent),
          },
          {
            path: 'update-advertisement/:id',
            loadComponent: () =>
              import(
                './modules/price-display/components/update-advertisement/update-advertisement-component.component'
              ).then((m) => m.UpdateAdvertisementComponentComponent),
          },
          {
            path: 'price-display',
            canActivate: [authGuard],
            loadComponent: () =>
              import(
                './modules/price-display/components/show-price/show-price-display.component'
              ).then((m) => m.ShowPriceDisplayComponent),
          },
          // (يمكنك إضافة المزيد لاحقاً مثل عرض الإعلانات، تحديثها، حذفها... إلخ)
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
                './modules/branch/components/show-branches/show-branches.component'
              ).then((m) => m.ShowBranchesComponent),
          },
          {
            path: 'add-branch',
            loadComponent: () =>
              import(
                './modules/branch/components/add-branch/add-branch.component'
              ).then((m) => m.AddBranchComponent),
          },
          {
            path: 'update-branch/:id',
            loadComponent: () =>
              import(
                './modules/branch/components/update-user/update-branch.component'
              ).then((m) => m.UpdateBranchComponent),
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
                './modules/inventory/unit/components/show-units/show-units.component'
              ).then((m) => m.ShowUnitsComponent),
          },
          {
            path: 'add-unit',
            loadComponent: () =>
              import(
                './modules/inventory/unit/components/add-unit/add-unit.component'
              ).then((m) => m.AddUnitComponent),
          },
          {
            path: 'update-unit/:id',
            loadComponent: () =>
              import(
                './modules/inventory/unit/components/update-unit/update-unit.component'
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
                './modules/inventory/product/components/show-products/show-products.component'
              ).then((m) => m.ShowProductsComponent),
          },
          {
            path: 'add-product',
            loadComponent: () =>
              import(
                './modules/inventory/product/components/add-product/add-product.component'
              ).then((m) => m.AddProductComponent),
          },
          {
            path: 'update-product/:id',
            loadComponent: () =>
              import(
                './modules/inventory/product/components/update-product/update-product.component'
              ).then((m) => m.UpdateProductComponent),
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
                './modules/inventory/warehouse/components/show-warehouses/show-warehouses.component'
              ).then((m) => m.ShowWarehousesComponent),
          },
          {
            path: 'add-warehouse',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/components/add-warehouse/add-warehouse.component'
              ).then((m) => m.AddWarehouseComponent),
          },
          {
            path: 'update-warehouse/:id',
            loadComponent: () =>
              import(
                './modules/inventory/warehouse/components/update-warehouse/update-warehouse.component'
              ).then((m) => m.UpdateWarehouseComponent),
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
      {
        path: '',
        canActivate: [authGuard, adminGuard],
        children: [
          {
            path: 'users',
            loadComponent: () =>
              import(
                './modules/users/components/show-users/show-users.component'
              ).then((m) => m.ShowUsersComponent),
          },
          {
            path: 'add-user',
            loadComponent: () =>
              import(
                './modules/users/components/add-user/add-user.component'
              ).then((m) => m.AddUserComponent),
          },
          {
            path: 'update-user/:id',
            loadComponent: () =>
              import(
                './modules/users/components/update-user/update-user.component'
              ).then((m) => m.UpdateUserComponent),
          },
        ],
      },
      ...accountingRoutes,
      ...inventoryRoutes,
    ],
  },
];
