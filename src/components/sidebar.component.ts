import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink],
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
            <a
              (click)="toggleDashboard()"
              class="flex items-center px-4 py-2 cursor-pointer"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="ml-2">Dashboard</span>
              <!-- Arrow Icon to Indicate Expansion -->
              <svg
                class="w-4 h-4 ml-auto transition-transform duration-200"
                [ngClass]="{ 'rotate-90': isDashboardExpanded }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>

            <!-- Sub-Items (Conditionally Rendered) -->
            <div
              class="pl-8 transform transition-transform duration-500"
              [ngClass]="{'h-0 -translate-y-0 invisible z-0': !isDashboardExpanded,
            'h-auto block translate-y-0': isDashboardExpanded,
          }"
            >
              <a routerLink="account" class="block px-4 py-2">Account</a>
              <a routerLink="cost-center" class="block px-4 py-2">Cost center</a>
              <a href="#" class="block px-4 py-2">Reports</a>
            </div>
          </div>

          <!-- Other Sidebar Items -->
          <a
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
          </a>
          <!-- Add more sidebar items here -->
        </nav>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  isSidebarOpen = false;
  isDashboardExpanded = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleDashboard() {
    this.isDashboardExpanded = !this.isDashboardExpanded; // Toggle expansion state
  }
}
