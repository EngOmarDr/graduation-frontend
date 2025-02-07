import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToggleThemeComponent } from '../../components/toggleTheme.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ToggleThemeComponent,
    FormsModule,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    this.primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim();
    // this.themeColors[7] = this.primaryColor;
  }

  isSidebarOpen = false;
  isSettingOpen = false;

  isDashboardExpanded = false;
  primaryColor = '';

  toggleDashboard() {
    this.isDashboardExpanded = !this.isDashboardExpanded; // Toggle expansion state
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSettingOpen = false;
  }

  showSetting() {
    this.isSettingOpen = true;
  }

  clickOutSide() {
    this.isSidebarOpen = false;
    this.isSettingOpen = false;
  }
  changePrimaryColor(value: string | Event) {
    if (typeof value == 'string') {
      document.documentElement.style.setProperty('--color-primary', value);
      this.primaryColor = value;
      // this.themeColors[7] = this.primaryColor;
    } else {
      const color = (value.target as HTMLInputElement).value;
      document.documentElement.style.setProperty('--color-primary', color);
      this.primaryColor = color;
      // this.themeColors[7] = this.primaryColor;
    }
  }

  themeColors = [
    '#6366F1',
    '#3B82F6',
    '#e91e63',
    '#06B6D4',
    '#10B981',
    '#F59E0B',
    '#D946EF',
    '#FFEB3B',
  ];
  scaleCircles = [
    { active: false },
    { active: false },
    { active: true },
    { active: false },
    { active: false },
  ];
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
