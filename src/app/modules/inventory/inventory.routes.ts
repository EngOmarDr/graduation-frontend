import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from 'app/core/guards/admin.guard';

export const inventoryRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'invoices',
        loadComponent: () =>
          import(
            './custom-invoice/components/invoice-list/invoice-list.component'
          ).then((m) => m.InvoiceListComponent),
      },
      {
        path: 'invoice/:name',
        loadComponent: () =>
          import(
            './custom-invoice/components/show/show-custom-invoice.component'
          ).then((m) => m.ShowCustomInvoicesComponent),
      },
      {
        path: 'add-invoice/:name',
        loadComponent: () =>
          import(
            './custom-invoice/components/add/add-custom-invoice.component'
          ).then((m) => m.AddCustomInvoiceComponent),
      },
      {
        path: 'update-invoice/:id',
        loadComponent: () =>
          import(
            './custom-invoice/components/update/update-custom-invoice.component'
          ).then((m) => m.UpdateCustomInvoiceComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'invoice-types',
        loadComponent: () =>
          import(
            './invoice-type/components/show-all/show-invoice-types.component'
          ).then((m) => m.ShowInvoiceTypesComponent),
      },
      {
        path: 'add-invoice-type',
        loadComponent: () =>
          import(
            './invoice-type/components/add/add-invoice-type.component'
          ).then((m) => m.AddInvoiceTypeComponent),
      },
      {
        path: 'update-invoice-type/:id',
        loadComponent: () =>
          import(
            './invoice-type/components/update/update-invoice-type.component'
          ).then((m) => m.UpdateInvoiceTypeComponent),
      },
    ],
  },
  {
    path: 'inventory-count',
    loadComponent: () =>
      import('./operation/inventory-count/inventory-count.component').then(
        (m) => m.InventoryCountComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-transfer',
    loadComponent: () =>
      import(
        './operation/transfer/components/add-transfer/add-transfer.component'
      ).then((m) => m.AddTransferComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'transfers',
    loadComponent: () =>
      import(
        './operation/transfer/components/show-transfer/show-transfers.component'
      ).then((m) => m.ShowTransfersComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'edit-transfer/:id',
    loadComponent: () =>
      import(
        './operation/transfer/components/edit-transfer/edit-transfer.component'
      ).then((m) => m.EditTransferComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'inventory-reports/:name',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './reports/components/inventory-reports/inventory-reports.component'
      ).then((m) => m.DailyMovementComponent),
  },
];
