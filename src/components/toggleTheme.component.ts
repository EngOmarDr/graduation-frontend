import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-theme',
  imports: [FormsModule],
  template: `
    @for (scheme of colorSchemes; track $index) {
    <div class="flex items-center gap-2">
      <input
        type="radio"
        [id]="scheme.id"
        name="colorScheme"
        [value]="scheme.value"
        [(ngModel)]="selectedColorScheme"
        (change)="onChangeTheme()"
      />
      <label [for]="scheme.id">{{ scheme.label }}</label>
    </div>
    }
  `,
})
export class ToggleThemeComponent implements OnInit {
  colorSchemes = [
    { id: 'mode-light', value: 'light', label: 'Light' },
    // { id: 'mode-dim', value: 'dim', label: 'Dim' },
    { id: 'mode-dark', value: 'dark', label: 'Dark' },
  ];

  selectedColorScheme = 'light';
  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.selectedColorScheme =
      theme === 'sys' || theme == null
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;
    this.applyTheme(this.selectedColorScheme);
  }

  onChangeTheme(): void {
    this.applyTheme(this.selectedColorScheme);
  }

  applyTheme(theme: string): void {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;

    const isDark = body.classList.toggle('dark');
    body.classList.toggle('dark', this.isDarkTheme);

    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', this.isDarkTheme);
  }
}
