import {
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left" #dropdown>
      <!-- Trigger -->
      <button
        (click)="toggleDropdown()"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-600 bg-white dark:bg-gray-800 dark:text-white shadow-lg hover:shadow-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 font-semibold"
      >
        🌍 {{ currentLang === 'en' ? 'English' : 'العربية' }}
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown -->
      <div
        *ngIf="dropdownOpen"
        class="absolute right-0 mt-2 w-44 rounded-xl shadow-2xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-10 z-50 animate-fade-slide"
      >
        <button
          (click)="setLanguage('en')"
          class="w-full text-left px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-all duration-200"
        >
          🇺🇸 English
        </button>
        <button
          (click)="setLanguage('ar')"
          class="w-full text-left px-5 py-3 text-sm text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-all duration-200"
        >
          🇸🇾 العربية
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-slide {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-slide {
      animation: fade-slide 0.25s ease-out forwards;
    }
  `],
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);
  currentLang: string = this.translate.currentLang || 'en';
  dropdownOpen = false;

  constructor(private eRef: ElementRef) {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.setDocumentDir(event.lang);
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setLanguage(lang: string) {
    if (lang === this.currentLang) {
      this.dropdownOpen = false;
      return;
    }

    this.translate.use(lang);
    this.currentLang = lang;
    this.setDocumentDir(lang);
    this.dropdownOpen = false;
  }

  private setDocumentDir(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
