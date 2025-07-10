import {Component, inject, viewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {MenuItem, MenuItemCommandEvent, MessageService} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {SlicePipe} from '@angular/common';
import {SubscribeFormComponent} from '../subscribe-form/subscribe-form.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {BreakpointService} from '../../services/breakpoint.service';
import {Dialog} from 'primeng/dialog';
import {SubscribeService} from '../../services/subscribe.service';

@Component({
  selector: 'footer',
  imports: [ButtonModule, MenuModule, SlicePipe, TranslatePipe, SocialButtonsComponent, SubscribeFormComponent, Dialog],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private breakpointService = inject(BreakpointService);
  private subscribeService = inject(SubscribeService);
  private messageService = inject(MessageService);

  subscribeFormComponent = viewChild(SubscribeFormComponent);
  showSubscribeForm = false;
  submitted = false;

  flagIcon = '';
  languageIndex: number = 0;
  languagesItems: MenuItem[] = [
    {id: 'en-EN', label: 'English', command: this.changeLang.bind(this)},
    {id: 'it-IT', label: 'Italian', command: this.changeLang.bind(this)}
  ];

  constructor() {
    this.flagIcon = `svg/${this.translateService.defaultLang}.svg`;
    this.languageIndex = this.languagesItems.findIndex(l => l.id === this.translateService.defaultLang);

    this.translateService.onLangChange.subscribe(({lang}) => {
      this.flagIcon = `svg/${lang}.svg`;
      this.languageIndex = this.languagesItems.findIndex(l => l.id === lang);
    });
  }

  changeLang(event: MenuItemCommandEvent) {
    this.translateService.use(event.item?.id!);
  }

  goToPrivacyPolicy() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/privacy-policy'])
    );

    window.open(url, '_blank');
  }

  openSubscribeForm() {
    this.showSubscribeForm = true;
  }

  closeDialog() {
    this.showSubscribeForm = false;
  }

  async onSubmit() {
    this.submitted = true;
    const ret = await this.subscribeService.onSubmit(this.subscribeForm);
    if (!ret.isValid) {
      return;
    }

    if (ret.isValid) {
      if (ret.status === 'success') {
        this.messageService.add({
          severity: 'success',
          summary: 'subscription',
          detail: this.translateService.instant('subscribedOk')
        });
      } else if (ret.status === 'error') {
        this.messageService.add({
          severity: 'error',
          summary: 'subscription',
          detail: this.translateService.instant('subscribedKo')
        });
      }

      this.submitted = false;
      this.closeDialog();
    }
  }

  get subscribeForm() {
    return this.subscribeFormComponent()?.subscribeForm;
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
