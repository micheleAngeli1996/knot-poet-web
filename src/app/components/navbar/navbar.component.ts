import {Component} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'navbar',
  imports: [MenubarModule, RouterModule, TranslateModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] = [
    {label: 'home', route: 'home'},
    {label: 'about', route: 'about'},
    {label: 'members', route: 'members'},
    {label: 'contact', route: 'contact'}
  ];
}
