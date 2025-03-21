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
      class="fixed z-40 inset-y-0 bg-[#f6f9fc] dark:bg-[#1f2937] left-0 md:z-19 w-64 overflow-y-auto transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0"
      [ngClass]="{
        '-translate-x-full ease-in': !isSidebarOpen,
        'translate-x-0 ease-out': isSidebarOpen
      }"
    >
      <div class="flex flex-col h-screen w-64">
        <div class="flex items-center justify-center h-16">
          <h2 class="text-xl font-bold">Logo</h2>
        </div>

        <nav class="mt-6">
          <!-- Dashboard Item -->
          <div>
            <button
              (click)="isCollapsed = !isCollapsed"
              type="button"
              class="flex items-center justify-between px-4 py-2 w-full cursor-pointer"
            >
              <span>Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform"
                [ngClass]="{ 'rotate-180': !isCollapsed }"
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

            <!-- Sub-Items (Conditionally Rendered) -->
            <div>
              <ul
                class="overflow-hidden ms-3.5 transition-[max-height] "
                [ngClass]="{
                  'max-h-0': isCollapsed,
                  'max-h-[500px]': !isCollapsed
                }"
              >
                <!-- <li>
                  <a
                    routerLink="cost-center"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Cost center</a
                  >
                </li> -->
                <li>
                <nav>
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
              >Product Categories</a
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
              routerLink="baseUnits"
              class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
              >Base Units</a
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
    </nav>
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
                    routerLink="warehouses"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Warehouse</a
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

                <!-- <li>
                  <a
                    routerLink="prices"
                    class="block px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                    >Prices</a
                  >
                </li> -->
              </ul>
            </div>
          </div>

          <!-- Other Sidebar Items -->
          <!-- <a
            href="#"
            class="flex items-center px-4 py-2 mt-2 transform transition-transform duration-300"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <span class="ml-2">Categories</span>
          </a> -->
          <!-- Add more sidebar items here -->
        </nav>
      </div>
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
