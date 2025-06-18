import {Component, inject, input} from '@angular/core';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'clipboard',
  imports: [ClipboardModule, ButtonModule],
  templateUrl: './clipboard.component.html',
  styleUrl: './clipboard.component.css'
})
export class ClipboardComponent {
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  value = input.required<string>();

  showClipboardMsg(copied: boolean) {
    this.messageService.add({
      summary: 'Info',
      severity: 'contrast',
      detail: this.translateService.instant('copied', {value: this.value()}),
      life: 3000
    })
  }
}
