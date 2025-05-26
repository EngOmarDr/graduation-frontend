import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  NgcCookieConsentConfig,
  provideNgcCookieConsent,
} from 'ngx-cookieconsent';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorToastrInterceptor } from './core/interceptors/error-toastr.interceptor';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'http://localhost:4200',
  },
  theme: 'classic',
  type: 'opt-in',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorToastrInterceptor])
    ),
    provideNgcCookieConsent(cookieConfig),
    provideToastr({
      progressBar: true,
      timeOut: 10000,
    }),
  ],
};
