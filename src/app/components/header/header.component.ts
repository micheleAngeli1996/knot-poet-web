import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {ButtonModule, ButtonProps} from 'primeng/button';
import {EventType, Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {BreakpointService} from '../../services/breakpoint.service';
import {DrawerModule} from 'primeng/drawer';
import {TranslatePipe} from '@ngx-translate/core';
import {filter} from 'rxjs';

@Component({
  selector: 'header',
  imports: [NavbarComponent, SocialButtonsComponent, ButtonModule, DrawerModule, NgClass, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private breakpointService = inject(BreakpointService);

  showMenu = false;

  constructor() {
    const element = document.querySelector('html');
    element?.classList.toggle('app-dark');
    this.router.events.pipe(filter(e => e.type === EventType.NavigationStart)).subscribe(() => this.showMenu = false);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }

  get isXSmall() {
    return this.breakpointService.isXSmall();
  }
}
