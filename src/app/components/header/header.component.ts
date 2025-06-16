import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, SocialButtonsComponent, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isDarkMode = true;

  constructor() {
    if (this.isSystemDark()) {
      this.toggleDarkMode();
    }
  }

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches || this.isDarkMode;
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('app-dark');
    this.isDarkMode = !this.isDarkMode;
  }
}
