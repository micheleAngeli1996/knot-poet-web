import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ClipboardComponent} from '../clipboard/clipboard.component';
import {ButtonModule} from 'primeng/button';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'footer',
  imports: [TranslatePipe, ClipboardComponent, ButtonModule, Divider],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  phone = "+39 333123457";
  mail = "knotpoet@gmail.com";
}
