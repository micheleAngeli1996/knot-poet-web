import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {NgStyle} from '@angular/common';
import {BreakpointService} from './services/breakpoint.service';

@Component({
  selector: 'root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, Toast, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  private breakpointService = inject(BreakpointService);
  title = 'knot-poet-website';

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }

}
