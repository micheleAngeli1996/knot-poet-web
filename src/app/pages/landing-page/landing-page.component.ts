import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {AnimateOnScrollModule} from 'primeng/animateonscroll';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonModule, AnimateOnScrollModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
