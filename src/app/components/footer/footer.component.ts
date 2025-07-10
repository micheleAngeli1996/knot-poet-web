import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {SlicePipe} from '@angular/common';
import {SubscribeFormComponent} from '../subscribe-form/subscribe-form.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'footer',
  imports: [ButtonModule, MenuModule, SlicePipe, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private dialogService = inject(DialogService);

  dynamicDialogRef: DynamicDialogRef<SubscribeFormComponent> | undefined;

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
    this.dynamicDialogRef = this.dialogService.open(SubscribeFormComponent, {
      showHeader: false,
      modal: true,
      width: '70%',
      closeOnEscape: true
    });
  }
}
