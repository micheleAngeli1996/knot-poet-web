import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'header',
  imports: [NavbarComponent, SocialButtonsComponent, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor() {
    const element = document.querySelector('html');
    element?.classList.toggle('app-dark');
  }
}
