import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    title: 'Knot Poet Official - Home',
    component: LandingPageComponent
  },
  {
    path: 'shop',
    title: 'Knot Poet Official - Shop',
    loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'contact',
    title: 'Knot Poet Official - Contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about',
    title: 'Knot Poet Official - About',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'about/:id',
    loadComponent: () => import('./pages/about-detail/about-detail.component').then(m => m.AboutDetailComponent)
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'news',
    title: 'News',
    loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent)
  },
  {path: '**', component: PageNotFoundComponent}
];
