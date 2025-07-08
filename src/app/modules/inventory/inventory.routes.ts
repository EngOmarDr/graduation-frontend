import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from 'app/core/guards/admin.guard';

export const inventoryRoutes: Routes = [
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
      import('./operation/transfer/components/add-transfer/add-transfer.component').then(
        (m) => m.AddTransferComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'transfers',
    loadComponent: () =>
      import('./operation/transfer/components/show-transfer/show-transfers.component').then(
        (m) => m.ShowTransfersComponent
      ),
    canActivate: [adminGuard],
  },
  // {
  //   path: 'accounts',
  //   loadComponent: () =>
  //     import('./account/components/show-accounts/show-accounts.component').then(
  //       (m) => m.ShowAccountsComponent
  //     ),
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'update-account/:id',
  //   loadComponent: () =>
  //     import(
  //       './account/components/update-account/update-account.component'
  //     ).then((m) => m.UpdateAccountComponent),
  //   canActivate: [authGuard],
  // },
];
