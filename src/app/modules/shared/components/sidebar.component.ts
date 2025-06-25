import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JournalTypesService } from 'app/modules/accounting/journal-type/services/journal-types.service';
import { JournalTypeResponse } from 'app/modules/accounting/journal-type/models/response/journal-type-response.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  template: `
    <!-- overlay -->
    <div
      class="fixed inset-0 z-30 transition-opacity bg-black opacity-50 lg:hidden"
      *ngIf="isSidebarOpen"
      (click)="closeSidebar()"
    ></div>

    <!-- sidebar -->
    <aside
      class="fixed start-0 top-0 z-40 h-svh bg-white dark:bg-dark-card-surface shadow-lg transition-transform duration-300 lg:sticky lg:translate-x-0 overflow-y-auto"
      [ngClass]="{
        '-translate-x-full ease-in': !isSidebarOpen,
        'translate-x-0 ease-out': isSidebarOpen,
        'w-64': !isCollapseded,
        'w-20': isCollapseded
      }"
    >
      <!-- <button
        (click)="toggleCollapse()"
        class="p-2"
        class="flex items-center transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        [ngClass]="{
          'justify-center': isCollapseded,
          'gap-2 text-left': !isCollapseded
        }"
      >
        <svg
          class="w-6 h-6 text-gray-700 dark:text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
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
      </button> -->

      <!-- Logo -->
      <div
        class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700"
      >
        <h2
          *ngIf="!isCollapseded"
          class="text-2xl font-bold text-primary dark:text-white"
        >
          🧾 STC
        </h2>
        <svg
          *ngIf="isCollapseded"
          class="w-6 h-6 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <nav class="p-4 space-y-2">
        <ng-container *ngFor="let item of routes()">
          <div *ngIf="item.children; else noChildren">
            <button
              (click)="item?.fun()"
              class="flex items-center transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              [ngClass]="{
                'justify-center': isCollapseded,
                'gap-2 text-left': !isCollapseded
              }"
              class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [innerHTML]="getLucideIcon(item.icon)"
                ></svg>
                <span *ngIf="!isCollapseded">{{ item.name }}</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform"
                [ngClass]="{ 'rotate-180': item?.attr() }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </button>

            <ul
              class="mt-1 pl-4 overflow-hidden space-y-1 transition-all"
              [ngClass]="{ 'max-h-0': !item?.attr(), 'max-h-96': item?.attr() }"
            >
              <li *ngFor="let subItem of item.children" class="my-1">
                @if (subItem.name=='br') {
                <!-- <hr> -->
                <div class="bg-zinc-300 w-full h-[1px]"></div>
                }@else {

                <a
                  [routerLink]="[subItem.routerLink]"
                  [state]="{ journalType: subItem.state }"
                  [ngClass]="{
                    'justify-center': isCollapseded,
                    'gap-2 text-left': !isCollapseded
                  }"
                  [tabIndex]="!isCollapseded ? -1 : null"
                  class="flex items-center gap-2 mx-3 px-3 py-1 rounded-md text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                  <!-- [routerLinkActiveOptions]="{ exact: true }" -->
                  <!-- routerLinkActive="bg-primary text-white dark:bg-primary" -->
                  <!-- <svg
                    class="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [innerHTML]="getLucideIcon(subItem.icon)"
                  ></svg> -->
                  <span *ngIf="!isCollapseded">{{ subItem.name }}</span>
                </a>
                }
              </li>
            </ul>
          </div>

          <ng-template #noChildren>
            <a
              routerLink="{{ item.routerLink }}"
              [ngClass]="{
                'justify-center': isCollapseded,
                'gap-2 text-left': !isCollapseded
              }"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 transition"
              routerLinkActive="bg-primary text-white dark:bg-primary"
            >
              <svg
                class="w-5 h-5 text-primary"
                routerLinkActive="bg-primary text-white dark:bg-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                [innerHTML]="getLucideIcon(item.icon)"
              ></svg>
              <span *ngIf="!isCollapseded">{{ item.name }}</span>
            </a>
          </ng-template>
        </ng-container>

        <!-- <hr class="my-4 border-gray-300 dark:border-gray-600" />

        <a
          routerLink="/settings"
          class="flex items-center transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          [ngClass]="{
            'justify-center': isCollapseded,
            'gap-2 text-left': !isCollapseded
          }"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          routerLinkActive="bg-primary text-white dark:bg-primary"
        >
          <svg
            class="w-5 h-5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            [innerHTML]="getLucideIcon('settings')"
          ></svg>
          Settings
        </a> -->
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private service = inject(JournalTypesService);
  journalTypes = this.service.journalTypes;

  isSidebarOpen = false;
  isCollapseded = false;
  isProductsExpanded = signal(false);
  isVouchersExpanded = signal(false);
  isAccountsExpanded = signal(false);
  isPurchasesExpanded = signal(false);
  isSalesExpanded = signal(false);

  toggleCollapse() {
    this.isCollapseded = !this.isCollapseded;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleAccounts() {
    this.isAccountsExpanded.update((v) => !v);
  }
  toggleProducts() {
    this.isProductsExpanded.update((v) => !v);
  }
  toggleVouchers() {
    this.isVouchersExpanded.update((v) => !v);
  }

  togglePurchases() {
    this.isPurchasesExpanded.update((v) => !v);
  }

  toggleSales() {
    this.isSalesExpanded.update((v) => !v);
  }

  routes: Signal<
    {
      name: string;
      icon: string;
      fun?: () => void;
      attr?: WritableSignal<boolean>;
      routerLink?: string;
      children?: {
        name: string;
        icon: string;
        routerLink?: string;
        fun?: undefined;
        attr?: undefined;
        children?: undefined;
        state?: any;
      }[];
    }[]
  > = computed(() => [
    { name: 'Dashboard', icon: 'home', routerLink: '/dashboard' },
    {
      name: 'Products',
      icon: 'package-search',
      fun: () => this.toggleProducts(),
      attr: this.isProductsExpanded,
      children: [
        {
          name: 'Products',
          icon: 'box',
          routerLink: '/products',
          state: undefined,
        },
        { name: 'Groups', icon: 'layers', routerLink: '/groups' },
        { name: 'Units', icon: 'ruler', routerLink: '/units' },
        { name: 'Warehouses', icon: 'warehouse', routerLink: '/warehouses' },
        { name: 'Price', icon: 'tag', routerLink: '/prices' },
        { name: 'Print Barcode', icon: 'barcode', routerLink: '/printBarcode' },
      ],
    },
    {
      name: 'Accounts',
      icon: 'wallet-cards',
      fun: () => this.toggleAccounts(),
      attr: this.isAccountsExpanded,
      children: [
        { name: 'Accounts', icon: 'wallet-card', routerLink: '/accounts' },
        { name: 'br', icon: 'wallet-card' },
        { name: 'Journal', icon: 'wallet-card', routerLink: '/journal' },
        { name: 'Ledger', icon: 'wallet-card', routerLink: '/ledger' },
        {
          name: 'Trail Balance',
          icon: 'wallet-card',
          routerLink: '/trail-balance',
        },
      ],
    },
    { name: 'Branches', icon: 'git-branch', routerLink: '/branches' },
    { name: 'Currencies', icon: 'coins', routerLink: '/currencies' },
    {
      name: 'Vouchers',
      icon: 'book-text',
      fun: () => this.toggleVouchers(),
      attr: this.isVouchersExpanded,
      children: [
        {
          name: 'Journal Entry',
          icon: 'book-text',
          routerLink: 'journal/journals',
        },
        { name: 'br', icon: '' },
        {
          name: 'Journal Type',
          icon: '',
          routerLink: 'journal-types',
        },
        ...this.journalTypes().map((next) => ({
          name: next.name,
          routerLink: `/show-custom-journal/${next.name}`,
          icon: '',
          state: next,
        })),
      ],
    },
    // { name: 'Payment Voucher', icon: 'receipt', routerLink: '/paymentVoucher' },
    // {
    //   name: 'Purchases',
    //   icon: 'shopping-cart',
    //   fun: () => this.togglePurchases(),
    //   attr: this.isPurchasesExpanded,
    //   children: [
    //     { name: 'Purchases', icon: 'shopping-bag', routerLink: '/purchases' },
    //     {
    //       name: 'Purchases Returns',
    //       icon: 'rotate-ccw',
    //       routerLink: '/purchasesReturns',
    //     },
    //   ],
    // },
    // {
    //   name: 'Sales',
    //   icon: 'shopping-basket',
    //   fun: () => this.toggleSales(),
    //   attr: this.isSalesExpanded,
    //   children: [
    //     { name: 'Sales', icon: 'badge-dollar-sign', routerLink: '/sales' },
    //     {
    //       name: 'Sales Returns',
    //       icon: 'rotate-ccw',
    //       routerLink: '/salesReturns',
    //     },
    //   ],
    // },
    { name: 'Roles/Permissions', icon: 'lock-keyhole', routerLink: '/roles' },
    { name: 'Settings', icon: 'settings', routerLink: '/settings' },
  ]);

  getLucideIcon(name: string): SafeHtml {
    const icons: { [key: string]: string } = {
      home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
      'package-search': `<path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="8"/><path d="M9 12l2 2 4-4"/>`,
      box: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/>`,
      layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/>`,
      ruler: `<path d="M3 3l18 18M3 3v18h18"/>`,
      warehouse: `<path d="M3 21V7l9-4 9 4v14"/><path d="M13 13h4v8h-4z"/><path d="M7 13h4v8H7z"/>`,
      tag: `<path d="M2 10l10 10a2 2 0 0 0 2.83 0l6.34-6.34a2 2 0 0 0 0-2.83L12 2H2z"/><circle cx="7" cy="7" r="1"/>`,
      barcode: `<path d="M2 6h2v12H2zM6 6h1v12H6zM10 6h2v12h-2zM14 6h1v12h-1zM18 6h2v12h-2z"/>`,
      'wallet-cards': `<path d="M20 6H4a2 2 0 0 0-2 2v2h20V8a2 2 0 0 0-2-2z"/><rect x="2" y="10" width="20" height="12" rx="2" ry="2"/><path d="M18 14h.01"/>`,
      'git-branch': `<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-12 9"/>`,
      coins: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
      'book-text': `<path d="M2 4h20v16H2z"/><path d="M2 10h20"/>`,
      receipt: `<path d="M21 2H3v20l3-3 3 3 3-3 3 3 3-3 3 3V2z"/>`,
      'shopping-cart': `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
      'shopping-bag': `<path d="M6 2l1.5 4h9L18 2"/><path d="M2 7h20l-1.38 10.74A2 2 0 0 1 18.64 20H5.36a2 2 0 0 1-1.98-2.26L2 7z"/>`,
      'rotate-ccw': `<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-9.94L1 10"/>`,
      'shopping-basket': `<path d="M4 7h16l-1.5 9.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7z"/><path d="M9 22V12"/><path d="M15 22V12"/>`,
      'badge-dollar-sign': `<path d="M12 1v22"/><path d="M17 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="M10 10h4M10 14h4"/>`,
      'lock-keyhole': `<rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
      settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    };

    return this.sanitizer.bypassSecurityTrustHtml(icons[name] || '');
  }
}
