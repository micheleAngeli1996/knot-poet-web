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

const firebaseConfig = {
  apiKey: "AIzaSyAY2Mg-br_5TG0njX-3Af6BZi-hIDerUqg",
  authDomain: "knotpoet-d351b.firebaseapp.com",
  databaseURL: "https://knotpoet-d351b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "knotpoet-d351b",
  storageBucket: "knotpoet-d351b.firebasestorage.app",
  messagingSenderId: "270241771530",
  appId: "1:270241771530:web:4229cba49fabefb204eff3",
  measurementId: "G-SMP0RTSE24"
};

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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
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
    })
  ]
};
