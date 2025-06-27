import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'about-dev',
  imports: [
    TranslatePipe
  ],
  templateUrl: './about-dev.component.html',
  styleUrl: './about-dev.component.css'
})
export class AboutDevComponent {

}
