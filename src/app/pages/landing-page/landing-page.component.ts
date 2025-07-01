import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {BreakpointService} from '../../services/breakpoint.service';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'landing-page',
  imports: [ButtonModule, NgStyle],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  private breakpointService = inject(BreakpointService);

  get isXSmall() {
    return this.breakpointService.isXSmall();
  }
}
