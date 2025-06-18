import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'social-buttons',
  imports: [Button, TranslateModule],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.css'
})

export class SocialButtonsComponent {

  socialButtons: MenuItem[] = [
    {label: 'instagram', url: 'https://www.instagram.com/knotpoet_/'},
    {label: 'facebook'},
    {label: 'spotify'},
    {label: 'youtube'},
  ];

  openUrl(url: string | undefined) {
    if (!url) return;
    window.open(url, '_blank');
  }
}
