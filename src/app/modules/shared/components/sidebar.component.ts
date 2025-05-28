import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  template: `
<!-- overlay -->
<div
  class="fixed inset-0 z-30 transition-opacity bg-black bg-opacity-50 lg:hidden"
  *ngIf="isSidebarOpen"
  (click)="closeSidebar()"
></div>

<!-- sidebar -->
<aside
  class="fixed start-0 top-0 z-40 h-svh w-64 bg-white dark:bg-dark-card-surface shadow-lg transition-transform duration-300 lg:sticky lg:translate-x-0 overflow-y-auto"
  [ngClass]="{
    '-translate-x-full ease-in': !isSidebarOpen,
    'translate-x-0 ease-out': isSidebarOpen,
    'w-64': !isCollapseded, 'w-20': isCollapseded
  }"
>

<button (click)="toggleCollapse()" class="p-2">
  <svg class="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path
      *ngIf="isCollapseded; else expandedIcon"
      d="M9 5l7 7-7 7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <ng-template #expandedIcon>
      <path
        d="M15 19l-7-7 7-7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </ng-template>
  </svg>
</button>


  <!-- Logo / Branding -->
  <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-primary dark:text-white">🧾 STC</h2>
  </div>

  <nav class="p-4 space-y-2">
    <!-- Navigation Items -->
    <ng-container *ngFor="let item of routes">
      <div *ngIf="item.children; else noChildren">
        <!-- Parent Item -->
        <button
          (click)="item.fun()"
          class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 6H20M4 12H20M4 18H11" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ item.name }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform"
            [ngClass]="{ 'rotate-180': item.attr() }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </button>

        <!-- Sub Items -->
        <ul
          class="mt-1 pl-4 overflow-hidden space-y-1 transition-all"
          [ngClass]="{
            'max-h-0': !item.attr(),
            'max-h-96': item.attr()
          }"
        >
          <li *ngFor="let subItem of item.children">
            <a
              routerLink="{{ subItem.routerLink }}"
              class="block px-3 py-1 rounded-md text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              routerLinkActive="bg-primary text-white dark:bg-primary"
              >{{ subItem.name }}</a
            >
          </li>
        </ul>
      </div>

      <!-- Items without children -->
      <ng-template #noChildren>
        <a
          routerLink="{{ item.routerLink }}"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          routerLinkActive="bg-primary text-white dark:bg-primary"
        >
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 6H20M4 12H20M4 18H11" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ item.name }}
        </a>
      </ng-template>
    </ng-container>

    <!-- Divider -->
    <hr class="my-4 border-gray-300 dark:border-gray-600" />

    <!-- Settings -->
    <a
      routerLink="/settings"
      class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      routerLinkActive="bg-primary text-white dark:bg-primary"
    >
      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 8V4m0 16v-4m8-4h4m-16 0H4m12.36-7.64l2.83-2.83m-11.31 0L4.22 4.22m0 15.56l2.83 2.83m11.31 0l2.83-2.83" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Settings
    </a>
  </nav>
</aside>
  `,
})
export class SidebarComponent {
  isSidebarOpen = false;
  isDashboardExpanded = false;
  isCollapsed: boolean = true;

  isProductsExpanded = signal(false);
  isPurchasesExpanded = signal(false);
  isSalesExpanded = signal(false);

  isCollapseded = false;

toggleCollapse() {
  this.isCollapseded = !this.isCollapseded;
}

  routes = [
    {
      name: 'Dashboard',
      icon: 'icon',
      routerLink: '',
    },
    {
      name: 'Products',
      icon: 'icon',
      fun: () => this.toggleProducts(),
      attr: this.isProductsExpanded,
      children: [
        {
          name: 'Products',
          icon: 'icon',
          routerLink: '/products',
        },
        {
          name: 'Groups',
          icon: 'icon',
          routerLink: '/groups',
        },
        {
          name: 'Units',
          icon: 'icon',
          routerLink: '/units',
        },
        {
          name: 'Warehouses',
          icon: 'icon',
          routerLink: '/warehouses',
        },
        {
          name: 'price',
          icon: 'icon',
          routerLink: '/prices',
        },
        {
          name: 'Print Barcode',
          icon: 'icon',
          routerLink: '/printBarcode',
        },
      ],
    },
    {
      name: 'Accounts',
      icon: 'icon',
      routerLink: '/accounts',
    },
    {
      name: 'Branches',
      icon: 'icon',
      routerLink: '/branches',
    },
    {
      name: 'Currencies',
      icon: 'icon',
      routerLink: '/currencies',
    },
    {
      name: 'Journals',
      icon: 'icon',
      routerLink: '/add-journal',
    },
    {
      name: 'Payment Voucher',
      icon: 'icon',
      routerLink: '/paymentVoucher',
    },
    {
      name: 'Purchases',
      icon: 'icon',
      fun: () => this.togglePurchases(),
      attr: this.isPurchasesExpanded,
      children: [
        {
          name: 'Purchases',
          icon: 'icon',
          routerLink: '/purchases',
        },
        {
          name: 'Purchases Returns',
          icon: 'icon',
          routerLink: '/purchasesReturns',
        },
      ],
    },
    {
      name: 'Sales',
      icon: 'icon',
      fun: () => this.toggleSales(),
      attr: this.isSalesExpanded,
      children: [
        {
          name: 'Sales',
          icon: 'icon',
          routerLink: '/sales',
        },
        {
          name: 'Sales Returns',
          icon: 'icon',
          routerLink: '/salesReturns',
        },
      ],
    },
    {
      name: 'Roles/Permissions',
      icon: 'icon',
      routerLink: '/roles',
    },
    {
      name: 'Settings',
      icon: 'icon',
      routerLink: '/settings',
    },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleProducts() {
    this.isProductsExpanded.update((value) => !value);
  }

  togglePurchases() {
    this.isPurchasesExpanded.update((value) => !value);
  }

  toggleSales() {
    this.isSalesExpanded.update((value) => !value);
  }
}
