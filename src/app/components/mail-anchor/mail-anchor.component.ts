import {Component, inject} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {ClipboardComponent} from '../clipboard/clipboard.component';

@Component({
  selector: 'mail-anchor',
  imports: [ClipboardComponent],
  templateUrl: './mail-anchor.component.html',
  styleUrl: './mail-anchor.component.css'
})
export class MailAnchorComponent {
  contactService = inject(ContactService);
}
