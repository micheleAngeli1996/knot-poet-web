import {Component, inject} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {ClipboardComponent} from '../clipboard/clipboard.component';

@Component({
  selector: 'phone',
  imports: [ClipboardComponent],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  contactService = inject(ContactService);
}
