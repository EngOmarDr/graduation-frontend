import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import {
  NgcCookieConsentConfig,
  provideNgcCookieConsent,
} from 'ngx-cookieconsent';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorToastrInterceptor } from './core/interceptors/error-toastr.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


const httpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

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
    ...SweetAlert2Module.forRoot({
      provideSwal: () =>
        import('sweetalert2').then(({ default: swal }) =>
          swal.mixin({
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonColor: 'var(--color-primary)',
            confirmButtonColor: 'var(--color-red-500)'
          })
        ),
    }).providers!,

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
