import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
          <li>
            <a
              routerLink="dashboard"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Dashboard</a
            >
          </li>
          <li>
            <!-- Products Item -->
            <div>
              <button
                (click)="toggleProducts()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>Products</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': isProductsExpanded }"
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
                  'max-h-0': !isProductsExpanded,
                  'max-h-[500px]': isProductsExpanded
                }"
              >
                <li>
                  <a
                    routerLink="products"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Products</a
                  >
                </li>
                <li>
                  <a
                    routerLink="groups"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Groups</a
                  >
                </li>

                <li>
                  <a
                    routerLink="units"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Units</a
                  >
                </li>
                <li>
                  <a
                    routerLink="warehouses"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Warehouse</a
                  >
                </li>
                <li>
                  <a
                    routerLink="printBarcode"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Print Barcode</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              routerLink="branches"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Branches</a
            >
          </li>
          <li>
            <a
              routerLink="adjustments"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Adjustments</a
            >
          </li>

          <li>
            <a
              routerLink="priceOffers"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Price Offers</a
            >
          </li>
          <li>
            <div>
              <button
                (click)="togglePurchases()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>Purchases</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': isPurchasesExpanded }"
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
                  'max-h-0': !isPurchasesExpanded,
                  'max-h-[500px]': isPurchasesExpanded
                }"
              >
                <li>
                  <a
                    routerLink="purchases"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Purchases</a
                  >
                </li>
                <li>
                  <a
                    routerLink="purchasesReturns"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Purchases Returns</a
                  >
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div>
              <button
                (click)="toggleSales()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>Sales</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': isSalesExpanded }"
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
                  'max-h-0': !isSalesExpanded,
                  'max-h-[500px]': isSalesExpanded
                }"
              >
                <li>
                  <a
                    routerLink="sales"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Sales</a
                  >
                </li>
                <li>
                  <a
                    routerLink="salesReturns"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Sales Returns</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              routerLink="transfers"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Transfers</a
            >
          </li>
          <li>
            <div>
              <button
                (click)="toggleExpenses()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>Expenses</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': isExpensesExpanded }"
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
                  'max-h-0': !isExpensesExpanded,
                  'max-h-[500px]': isExpensesExpanded
                }"
              >
                <li>
                  <a
                    routerLink="expenses"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Expenses</a
                  >
                </li>
                <li>
                  <a
                    routerLink="expenseCategories"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Expense Categories</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <button
                (click)="togglePeoples()"
                type="button"
                class="flex items-center justify-between px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                <span>Peoples</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform"
                  [ngClass]="{ 'rotate-180': isPeoplesExpanded }"
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
                  'max-h-0': !isPeoplesExpanded,
                  'max-h-[500px]': isPeoplesExpanded
                }"
              >
                <li>
                  <a
                    routerLink="suppliers"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Suppliers</a
                  >
                </li>
                <li>
                  <a
                    routerLink="customers"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Customers</a
                  >
                </li>
                <li>
                  <a
                    routerLink="employs"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Employs</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              routerLink="roles"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Roles/Permissions</a
            >
          </li>
          <li>
            <a
              routerLink="reports"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Reports</a
            >
          </li>
          <li>
            <a
              routerLink="currencies"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Currencies</a
            >
          </li>
          <li>
            <a
              routerLink="languages"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Languages</a
            >
          </li>
          <li>
            <a
              routerLink="settings"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Settings</a
            >
          </li>

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
  isProductsExpanded = false;
  isProductsCollapsed: boolean = true;

  isPurchasesExpanded = false;
  isPurchasesCollapsed: boolean = true;

  isSalesExpanded = false;
  isSalesCollapsed: boolean = true;

  isExpensesExpanded = false;
  isExpensesCollapsed: boolean = true;

  isPeoplesExpanded = false;
  isPeoplesCollapsed: boolean = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleDashboard() {
    this.isDashboardExpanded = !this.isDashboardExpanded; // Toggle expansion state
  }

  toggleProducts() {
    this.isProductsExpanded = !this.isProductsExpanded;
  }

  togglePurchases() {
    this.isPurchasesExpanded = !this.isPurchasesExpanded;
  }

  toggleSales() {
    this.isSalesExpanded = !this.isSalesExpanded;
  }
  toggleExpenses() {
    this.isExpensesExpanded = !this.isExpensesExpanded;
  }
  togglePeoples() {
    this.isPeoplesExpanded = !this.isPeoplesExpanded;
  }
}
