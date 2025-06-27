import {Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {NgClass} from '@angular/common';
import {BreakpointService} from '../../services/breakpoint.service';

@Component({
  selector: 'navbar',
  imports: [RouterModule, TranslateModule, ButtonModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private breakpointService = inject(BreakpointService);
  items: MenuItem[] = [
    {label: 'home', url: 'home'},
    {label: 'about', url: 'about'},
    {label: 'contact', url: 'contact'}
  ];

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
