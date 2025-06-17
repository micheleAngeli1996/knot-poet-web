import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'social-buttons',
  imports: [Button, TranslateModule, TooltipModule],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.css'
})
export class SocialButtonsComponent {

  socialButtons: MenuItem[] = [
    {label: 'instagram', icon: 'pi pi-instagram', url: 'https://www.instagram.com/knotpoet_/'},
    {label: 'facebook', icon: 'pi pi-facebook'},
    {label: 'spotify', icon: 'pi pi-spotify'},
    {label: 'youtube', icon: 'pi pi-youtube'},
  ];

  openUrl(url: string | undefined) {
    if (!url) return;
    window.open(url, '_blank');
  }
}
