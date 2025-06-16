import {Component} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] = [
    {label: 'home', route: '/'},
    {label: 'about', route: 'about'},
    {label: 'members', route: 'members'},
    {label: 'contact', route: 'contact'}
  ];
}
