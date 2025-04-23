import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  template: `
    <!-- overlay -->
    <div
      class="fixed inset-0 z-30 transition-opacity bg-black opacity-50"
      *ngIf="isSidebarOpen"
      (click)="closeSidebar()"
    ></div>

    <!-- sidebar -->
    <aside
      class="fixed start-0 top-0 lg:sticky z-40 h-svh bg-card-surface shadow-primary dark:shadow-dark-primary dark:bg-dark-card-surface w-64 overflow-y-auto transition-transform duration-300 lg:translate-x-0"
      [ngClass]="{
        '-translate-x-full ease-in': !isSidebarOpen,
        'translate-x-0 ease-out': isSidebarOpen
      }"
      style="overflow: -moz-hidden-unscrollable;
            scrollbar-width: none;"
    >
      <div class="flex items-center justify-center h-16 ">
        <h2 class="text-xl font-bold">Logo</h2>
      </div>
      <nav class="mb-3">
        <ul
          class="mb-3 ms-3.5 transition-[max-height] "
          [ngClass]="{
            'max-h-0': isCollapsed,
            '': !isCollapsed
          }"
        >
          @for (item of routes; track item.name) { @if (item.children) {
          <li>
            <div>
              <button
                (click)="item.fun()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>{{ item.name }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': item.attr() }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Sub-Items -->
              <ul
                class="overflow-hidden ms-3.5 transition-[max-height]"
                [ngClass]="{
                  'max-h-0': !item.attr(),
                  'max-h-[500px]': item.attr()
                }"
              >
                @for(subItem of item.children; track subItem.name){
                <li>
                  <a
                    routerLink="{{ subItem.routerLink }}"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >{{ subItem.name }}</a
                  >
                </li>

                }
              </ul>
            </div>
          </li>
          }@else{
          <li>
            <a
              routerLink="{{ item.routerLink }}"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >{{ item.name }}</a
            >
          </li>
          } }

          <span aria-hidden="true" class="block mb-3 pb-3"> </span>
        </ul>
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
