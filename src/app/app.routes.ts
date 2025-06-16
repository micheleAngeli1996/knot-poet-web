import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
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
    loadComponent: () => import('./pages/bio-group/bio-group.component').then(m => m.BioGroupComponent)
  },
  {
    path: 'members',
    loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent),
    children: [
      {
        path: 'member/:id',
        loadChildren: () => import('./pages/member-detail/member-detail.component').then(m => m.MemberDetailComponent)
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
