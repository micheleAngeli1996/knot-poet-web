import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SubscribeService} from '../../services/subscribe.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {Checkbox} from 'primeng/checkbox';
import {BreakpointService} from '../../services/breakpoint.service';
import {MessageService} from 'primeng/api';
import {SubscribeForm} from '../../models/Subcription';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    InputText,
    Button,
    NgTemplateOutlet,
    Checkbox,
    NgClass
  ],
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent {
  private subscribeService = inject(SubscribeService);
  private breakpointService = inject(BreakpointService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private http = inject(HttpClient);
  public dynamicDialogRef = inject(DynamicDialogRef);

  subscribeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]*/),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    agreement: new FormControl(false)
  });

  submitted = false;

  async onSubmit() {
    this.submitted = true;
    if (this.subscribeForm.invalid) {
      return;
    }

    try {
      const resp = await this.subscribeService.addSubscriber(this.subscribeForm.value as SubscribeForm);
      if (resp.id) {
        this.messageService.add({
          severity: 'success',
          summary: 'subscription',
          detail: this.translateService.instant('subscribedOk')
        });
        this.subscribeForm.reset();
        this.subscribeService.getSubscriber(resp.id).subscribe(subscriber => {
          if (subscriber?.subscriptionToken) {
            this.sendMailToNewSubscriber(subscriber.subscriptionToken);
          }
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'subscription',
          detail: this.translateService.instant('subscribedKo')
        });
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'subscription',
        detail: this.translateService.instant('subscribedKo')
      });
    } finally {
      this.submitted = false;
      this.closeDialog();
    }
  }

  sendMailToNewSubscriber(subscribeToken: string) {
    this.http.get('https://www.knotpoet.com/api/sendMailNewSubscriber?token=' + subscribeToken).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('Errore durante la registrazione:', error);
      },
      complete: () => {
        console.log('Completato');
      }
    });
  }

  closeDialog() {
    this.dynamicDialogRef.close();
  }

  get f() {
    return this.subscribeForm.controls;
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
