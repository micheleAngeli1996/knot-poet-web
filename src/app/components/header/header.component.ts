import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  imports: [NavbarComponent, SocialButtonsComponent, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);

  constructor() {
    const element = document.querySelector('html');
    element?.classList.toggle('app-dark');
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
