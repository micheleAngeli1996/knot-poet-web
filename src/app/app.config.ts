import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideTranslateService, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import {providePrimeNG} from 'primeng/config';
import {kpPreset} from '../../public/theme';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {platformBrowser} from '@angular/platform-browser';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    })]),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: kpPreset,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    })
  ]
};
