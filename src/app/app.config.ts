import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {kpPreset} from '../../public/theme';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideAnimations} from '@angular/platform-browser/animations';

import {initializeApp} from "firebase/app";
import {provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

import localeIt from '@angular/common/locales/it';
import {registerLocaleData} from '@angular/common';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {environment} from '../environments/environment';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

registerLocaleData(localeIt);

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimations(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: navigator.language || 'en-EN'
    })]),
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      ripple: false,
      theme: {
        preset: kpPreset,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
    MessageService, DialogService
  ]
};
