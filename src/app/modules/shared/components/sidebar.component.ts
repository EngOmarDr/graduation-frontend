import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JournalTypesService } from 'app/modules/accounting/journal-type/services/journal-types.service';
import {
  AccountingReportsKeys,
  InventoryReportsKeys,
} from 'app/core/constants/constant';
import { InvoiceTypeService } from 'app/modules/inventory/invoice-type/services/invoice-type.service';
import { StorageService } from 'app/core/services/storage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { sidebarConfig } from './sidebar.config';
import { Roles } from '../../../core/constants/roles.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, TranslateModule],
  template: `
    <!-- overlay -->
    <div
      class="fixed inset-0 z-30 transition-opacity bg-black opacity-50 lg:hidden"
      *ngIf="isSidebarOpen"
      (click)="toggleSidebar(false)"
    ></div>

    <!-- sidebar -->
<aside
  class="fixed top-0 min-w-60 z-40 h-svh bg-white dark:bg-dark-card-surface
         shadow-lg transition-transform duration-300 lg:sticky lg:translate-x-0 overflow-y-auto"
  [ngClass]="{
    'start-0 -translate-x-full': !isSidebarOpen && !isArabic,
    'start-0 translate-x-0': isSidebarOpen && !isArabic,
    'end-0 translate-x-full': !isSidebarOpen && isArabic,
    'end-0 translate-x-0': isSidebarOpen && isArabic
  }"
>

      <!-- Logo -->
      <div
        class="flex items-center justify-center h-16 border-b-2 border-primary"
      >
        <h2 class="text-2xl font-bold text-primary dark:text-white">🧾 STC</h2>
      </div>

      <nav class="p-4 space-y-2">
        <ng-container *ngFor="let item of routes()">
          @if(item.children){
          <div>
            <button
              (click)="item?.fun()"
              class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [innerHTML]="getLucideIcon(item.icon)"
                ></svg>
                <span>{{ item.name | translate }}</span>
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
              [ngClass]="{
                'max-h-0': !item?.attr(),
                'max-h-svh': item?.attr()
              }"
            >
              @for(subItem of item.children;track $index){ @if(!subItem){ }
              @else if(subItem?.name=='br'){
              <li>
                <div class="bg-zinc-300 w-full h-[1px]"></div>
              </li>
              }@else {

              <li>
                <a
                  [routerLink]="[subItem.routerLink]"
                  [state]="{ state: subItem.state }"
                  [tabIndex]="!item?.attr() ? -1 : 0"
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
                  <span>{{ subItem.name | translate }}</span>
                </a>
              </li>
              }}
            </ul>
          </div>
          }@else {
          <a
            routerLink="{{ item.routerLink }}"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 transition"
            routerLinkActive="text-primary"
          >
            <svg
              class="w-5 h-5 text-black"
              routerLinkActive="text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              [innerHTML]="getLucideIcon(item.icon)"
            ></svg>
            <span>{{ item.name | translate }}</span>
          </a>
          }
        </ng-container>
      </nav>
    </aside>
  `,
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    this.languageService.onLangChange.subscribe((v) => {
      this.isArabic.set(v.lang == 'ar');
    });
    this.currentRole = this.storageService.role as Roles;
  }

  private readonly sanitizer = inject(DomSanitizer);
  private journalService = inject(JournalTypesService);
  private invoiceService = inject(InvoiceTypeService);
  private storageService = inject(StorageService);
  private languageService = inject(TranslateService);
  isArabic = signal<boolean>(false);
  journalTypes = this.journalService.journalTypes;
  invoiceTypes = this.invoiceService.invoiceTypes;

  isSidebarOpen = false;
  isExpanded = {
    products: signal(false),
    accounts: signal(false),
    invoices: signal(false),
    vouchers: signal(false),
  };

  currentRole!: Roles;


  toggleSidebar(isOpen?: boolean) {
    this.isSidebarOpen = isOpen ?? !this.isSidebarOpen;
  }

  toggleSection(section: keyof typeof this.isExpanded) {
    for (const [key, signal] of Object.entries(this.isExpanded)) {
      if (key == section) {
        signal.update((v) => !v);
      } else {
        signal.set(false);
      }
    }
  }

//   routes: Signal<any[]> = computed(() => {
//   if (!this.currentRole) return [];

//   return sidebarConfig[this.currentRole] || [];
// });

  // routes: Signal<any> = computed(() => [
  //   { name: 'sidebar.dashboard', icon: 'home', routerLink: '/' },
  //   {
  //     name: 'sidebar.products',
  //     icon: 'package-search',
  //     fun: () => this.toggleSection('products'),
  //     attr: this.isExpanded.products,
  //     children: [
  //       {
  //         name: 'sidebar.products_list',
  //         icon: 'box',
  //         routerLink: '/products',
  //         state: undefined,
  //       },
  //       { name: 'sidebar.groups', icon: 'layers', routerLink: '/groups' },
  //       { name: 'sidebar.units', icon: 'ruler', routerLink: '/units' },
  //       {
  //         name: 'sidebar.warehouses',
  //         icon: 'warehouse',
  //         routerLink: '/warehouses',
  //       },
  //       { name: 'sidebar.price', icon: 'tag', routerLink: '/prices' },
  //       {
  //         name: 'sidebar.print_barcode',
  //         icon: 'barcode',
  //         routerLink: '/printBarcode',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'sidebar.accounts',
  //     icon: 'wallet-cards',
  //     fun: () => this.toggleSection('accounts'),
  //     attr: this.isExpanded.accounts,
  //     children: [
  //       {
  //         name: 'sidebar.accounts_list',
  //         icon: 'wallet-card',
  //         routerLink: '/accounts',
  //       },
  //       { name: 'br', icon: '' },
  //       {
  //         name: 'sidebar.general_journal',
  //         icon: '',
  //         routerLink: `accounting-reports/${AccountingReportsKeys.GENERALJOURNAL}`,
  //       },
  //       {
  //         name: 'sidebar.ledger',
  //         icon: '',
  //         routerLink: `accounting-reports/${AccountingReportsKeys.LEDGER}`,
  //       },
  //       {
  //         name: 'sidebar.trial_balance',
  //         icon: '',
  //         routerLink: `accounting-reports/${AccountingReportsKeys.TRAILBALANCE}`,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'sidebar.price_display',
  //     icon: 'tag',
  //     routerLink: '/advertisements/',
  //   },
  //   { name: 'sidebar.branches', icon: 'git-branch', routerLink: '/branches' },
  //   { name: 'sidebar.currencies', icon: 'coins', routerLink: '/currencies' },
  //   {
  //     name: 'sidebar.vouchers',
  //     icon: 'book-text',
  //     fun: () => this.toggleSection('vouchers'),
  //     attr: this.isExpanded.vouchers,
  //     children: [
  //       {
  //         name: 'sidebar.journal_entry',
  //         icon: 'book-text',
  //         routerLink: 'journal/journals',
  //       },
  //       { name: 'br', icon: '' },
  //       {
  //         name: 'sidebar.journal_type',
  //         icon: '',
  //         routerLink: 'journal-types',
  //       },
  //       ...this.journalTypes().map((next) => ({
  //         name: next.name,
  //         routerLink: `/show-custom-journal/${next.name}`,
  //         icon: '',
  //         state: next,
  //       })),
  //     ],
  //   },
  //   {
  //     name: 'sidebar.invoices',
  //     icon: 'invoice',
  //     fun: () => this.toggleSection('invoices'),
  //     attr: this.isExpanded.invoices,
  //     children: [
  //       // {
  //       //   name: 'sidebar.invoice_entry',
  //       //   icon: 'book-text',
  //       //   routerLink: 'invoice/invoices',
  //       // },
  //       // { name: 'br', icon: '' },
  //       {
  //         name: 'sidebar.invoice_type',
  //         icon: '',
  //         routerLink: 'invoice-types',
  //       },
  //       ...this.invoiceTypes().map((next) => ({
  //         name: next.name,
  //         routerLink: `/invoice/${next.name}`,
  //         icon: '',
  //         state: next,
  //       })),
  //       this.storageService.isAdmin ? { name: 'br', icon: '' } : undefined,

  //       this.storageService.isAdmin
  //         ? {
  //             name: 'sidebar.transfer_process',
  //             icon: '',
  //             routerLink: 'transfers',
  //           }
  //         : undefined,
  //       {
  //         name: 'sidebar.inventory_count',
  //         icon: '',
  //         routerLink: 'inventory-count',
  //       },
  //       ,
  //       { name: 'br', icon: '' },
  //       {
  //         name: 'sidebar.item_movement',
  //         icon: '',
  //         routerLink: `inventory-reports/${InventoryReportsKeys.ItemMovement}`,
  //       },
  //       {
  //         name: 'sidebar.daily_movement',
  //         icon: '',
  //         routerLink: `inventory-reports/${InventoryReportsKeys.DailyMovement}`,
  //       },
  //       {
  //         name: 'sidebar.item_stock',
  //         icon: '',
  //         routerLink: `inventory-reports/${InventoryReportsKeys.ItemStock}`,
  //       },
  //     ],
  //   },
  //   { name: 'sidebar.users', icon: 'lock-keyhole', routerLink: '/users' },
  //   { name: 'sidebar.settings', icon: 'settings', routerLink: '/settings' },
  // ]);

  routes: Signal<any[]> = computed(() => {
  if (!this.currentRole) return [];

  let config = sidebarConfig[this.currentRole] || [];

  // انسخ نسخة جديدة مع إدخال الـ dynamic data
  return config.map(item => {
    if (item.section) {
      return {
        ...item,
        fun: () => this.toggleSection(item.section),
        attr: this.isExpanded[item.section as keyof typeof this.isExpanded],
        children: [
          ...(item.children || []),
          ...(item.section === 'vouchers'
            ? this.journalTypes().map(next => ({
                name: next.name,
                routerLink: `/show-custom-journal/${next.name}`,
                icon: '',
                state: next,
              }))
            : []),
          ...(item.section === 'invoices'
            ? this.invoiceTypes().map(next => ({
                name: next.name,
                routerLink: `/invoice/${next.name}`,
                icon: '',
                state: next,
              }))
            : []),
        ],
      };
    }
    return item;
  });
});


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
      invoice: `
<svg viewBox="0 0 44 44" id="b" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.c{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="c" d="m10.7616,42.3349h21.2151c5.8118,0,10.5233-4.7114,10.5233-10.5233V5.6651h-21.2081c-2.9059,0-5.2616,2.3557-5.2616,5.2616l-.007,5.1001"></path><path class="c" d="m10.7616,16.0268h5.2616v21.0465c0,2.904-2.3577,5.2616-5.2616,5.2616h0c-2.904,0-5.2616-2.3577-5.2616-5.2616v-15.7849c0-2.904,2.3577-5.2616,5.2616-5.2616Z"></path><line class="c" x1="5.5" y1="25.3909" x2="16.0233" y2="25.3909"></line><line class="c" x1="22.437" y1="25.3909" x2="35.7983" y2="25.3909"></line><line class="c" x1="22.437" y1="32.177" x2="35.7983" y2="32.177"></line><rect class="c" x="22.437" y="13.3152" width="5.8377" height="5.8377"></rect></g>
`,
    };

    return this.sanitizer.bypassSecurityTrustHtml(icons[name] || '');
  }
}
