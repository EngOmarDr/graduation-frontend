import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ToggleThemeComponent } from './toggleTheme.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-bar',
  imports: [CommonModule, ToggleThemeComponent, FormsModule],
  template: `
    <!-- overlay -->
    <div
      class="fixed inset-0 z-30 transition-opacity bg-black opacity-50"
      *ngIf="isSettingOpen"
      (click)="closeSetting()"
    ></div>

    <button
      type="button"
      (click)="showSetting()"
      class="fixed top-[50%] right-0 p-1 pe-2 bg-primary rounded-s-md"
    >
      <img src="assets/icons/settings.png" width="34" alt="settings" />
    </button>
    <div
      class="fixed right-0 inset-y-0 w-72 p-6 pt-0 bg-[#f6f9fc] dark:bg-[#1f2937] overflow-y-auto z-40 transition-transform"
      style="transition-property: visibility, translate;"
      [ngClass]="{
        'translate-x-full invisible': !isSettingOpen,
        'translate-0 visible': isSettingOpen
      }"
    >
      <!-- Header -->
      <div class="flex justify-between items-center h-16">
        <button
          type="button"
          class="p-2 cursor-pointer rounded-full"
          (click)="isSettingOpen = false"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Themes Section -->
      <h5 class="text-lg font-semibold mb-2">Themes</h5>
      <div class="grid grid-cols-4 gap-2">
        @for (color of themeColors; track $index) {
        <button
          [style.backgroundColor]="color"
          class="w-7 h-7 rounded-full"
          [ngClass]="{
            'outline-[3px] outline-offset-[3px] outline-primary':
              color == primaryColor
          }"
          (click)="changePrimaryColor(color)"
        ></button>
        }
        <!-- <label
        class="relative cursor-pointer w-0"
        [style.backgroundColor]="themeColors[7]"
      >
        <input
          type="color"
          id="colorPicker"
          [value]="primaryColor"
          class="w-0 h-0 block"
          (change)="changePrimaryColor($event)"
        />
        <span
          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary"
          [ngClass]="{
            'outline-2 outline-offset-2 outline-primary':
              themeColors[7] == primaryColor,
          }"
          id="colorDisplay"
          >C</span
        >
      </label> -->
      </div>

      <!-- Scale Section -->
      <!-- <h5 class="text-lg font-semibold mt-4 mb-2">Scale</h5>
    <div class="flex items-center">
      <button class="p-2 rounded-full hover:bg-gray-100 ">
        <span class="pi pi-minus"></span>
      </button>
      <div class="flex gap-2 mx-2">
        <i
          *ngFor="let circle of scaleCircles"
          class="pi pi-circle-fill"
          [ngClass]="{
            'text-primary-500': circle.active,
            'text-gray-300': !circle.active
          }"
        ></i>
      </div>
      <button class="p-2 rounded-full hover:bg-gray-100 ">
        <span class="pi pi-plus"></span>
      </button>
    </div> -->

      <!-- Menu Type Section -->
      <h5 class="text-lg font-semibold mt-4 mb-2">Menu Type</h5>
      <div class="flex flex-wrap gap-2">
        <div *ngFor="let menu of menuTypes" class="flex items-center gap-2">
          <input
            type="radio"
            [id]="menu.id"
            name="menuMode"
            [value]="menu.value"
            [(ngModel)]="selectedMenuMode"
          />
          <label [for]="menu.id">{{ menu.label }}</label>
        </div>
      </div>

      <!-- Menu Theme Section -->
      <h5 class="text-lg font-semibold mt-4 mb-2">Menu Theme</h5>
      <div class="flex flex-col gap-2">
        <div *ngFor="let theme of menuThemes" class="flex items-center gap-2">
          <input
            type="radio"
            [id]="theme.id"
            name="menuTheme"
            [value]="theme.value"
            [(ngModel)]="selectedMenuTheme"
          />
          <label [for]="theme.id">{{ theme.label }}</label>
        </div>
      </div>

      <!-- Color Scheme Section -->
      <h5 class="text-lg font-semibold mt-4 mb-2">Color Scheme</h5>
      <div class="flex flex-col gap-2">
        <app-toggle-theme />
      </div>

      <!-- Input Style Section -->
      <h5 class="text-lg font-semibold mt-4 mb-2">Input Style</h5>
      <div class="flex gap-4">
        <div *ngFor="let style of inputStyles" class="flex items-center gap-2">
          <input
            type="radio"
            [id]="style.id"
            name="inputStyle"
            [value]="style.value"
            [(ngModel)]="selectedInputStyle"
          />
          <label [for]="style.id">{{ style.label }}</label>
        </div>
      </div>

      <!-- Ripple Effect Section -->
      <h5 class="text-lg font-semibold mt-4 mb-2">Ripple Effect</h5>
      <input type="checkbox" [(ngModel)]="rippleEffect" class="toggle" />
    </div>
  `,
})
export class SettingbarComponent implements OnInit {
  isSettingOpen = false;
  primaryColor = '';

  themeColors = [
    '#6366f1',
    '#3B82f6',
    '#e91e63',
    '#06B6D4',
    '#10B981',
    '#f59E0B',
    '#D946Ef',
    '#ffEB3B',
  ];
  ngOnInit(): void {
    this.primaryColor =
      localStorage.getItem('primaryColor') ??
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
    document.documentElement.style.setProperty(
      '--color-primary',
      this.primaryColor
    );
    // this.themeColors[7] = this.primaryColor;
  }

  closeSetting() {
    this.isSettingOpen = false;
  }

  showSetting() {
    this.isSettingOpen = true;
  }

  changePrimaryColor(value: string | Event) {
    if (typeof value == 'string') {
      document.documentElement.style.setProperty('--color-primary', value);
      localStorage.setItem('primaryColor', value);
      this.primaryColor = value;
      // this.themeColors[7] = this.primaryColor;
    } else {
      const color = (value.target as HTMLInputElement).value;
      document.documentElement.style.setProperty('--color-primary', color);
      localStorage.setItem('primaryColor', color);
      this.primaryColor = color;
      // this.themeColors[7] = this.primaryColor;
    }
  }

  menuTypes = [
    { id: 'mode1', value: 'static', label: 'Static' },
    { id: 'mode2', value: 'overlay', label: 'Overlay' },
    { id: 'mode3', value: 'slim', label: 'Slim' },
    { id: 'mode4', value: 'slim-plus', label: 'Slim +' },
    { id: 'mode5', value: 'reveal', label: 'Reveal' },
    { id: 'mode6', value: 'drawer', label: 'Drawer' },
    { id: 'mode7', value: 'horizontal', label: 'Horizontal' },
  ];
  menuThemes = [
    {
      id: 'menutheme-colorscheme',
      value: 'colorScheme',
      label: 'Color Scheme',
    },
    {
      id: 'menutheme-primarycolor',
      value: 'primaryColor',
      label: 'Primary Color',
    },
    { id: 'menutheme-transparent', value: 'transparent', label: 'Transparent' },
  ];

  inputStyles = [
    { id: 'outlined_input', value: 'outlined', label: 'Outlined' },
    { id: 'filled_input', value: 'filled', label: 'Filled' },
  ];

  selectedMenuMode = 'static';
  selectedMenuTheme = 'colorScheme';
  selectedInputStyle = 'outlined';
  rippleEffect = false;
}
