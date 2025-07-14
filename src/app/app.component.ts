import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'graduation-project';
  name = 'Hamza';
  currentLang = 'en'; 

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const selectedLang = browserLang?.match(/en|ar/) ? browserLang : 'en';

    this.useLanguage(selectedLang);
  }

  useLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
