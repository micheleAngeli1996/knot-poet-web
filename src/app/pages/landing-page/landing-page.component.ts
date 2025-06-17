import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {AnimateOnScrollModule} from 'primeng/animateonscroll';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'landing-page',
  imports: [ButtonModule, AnimateOnScrollModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [style({transform: 'translateX(-100%)'}), animate(100)]),
      transition('* => void', [animate(100, style({transform: 'translateX(100%)'}))]),
    ]),
  ],
})
export class LandingPageComponent {

}
