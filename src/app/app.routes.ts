import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'members',
    loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent)
  },
  {
    path: 'members/:id',
    loadComponent: () => import('./pages/member-detail/member-detail.component').then(m => m.MemberDetailComponent)
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent)
  },
  {path: '**', component: PageNotFoundComponent}
];
