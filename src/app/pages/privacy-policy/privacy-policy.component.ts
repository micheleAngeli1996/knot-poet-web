import {Component} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {MailAnchorComponent} from '../../components/mail-anchor/mail-anchor.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    UpperCasePipe,
    MailAnchorComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
}
