import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FloatLabel} from 'primeng/floatlabel';
import {MessageService} from 'primeng/api';
import {Divider} from 'primeng/divider';
import {BreakpointService} from '../../services/breakpoint.service';
import {NgClass} from '@angular/common';
import {MailAnchorComponent} from '../../components/mail-anchor/mail-anchor.component';
import {PhoneComponent} from '../../components/phone/phone.component';
import {SEOService} from '../../services/seo.service';

@Component({
  selector: 'contact',
  imports: [CardModule, InputTextModule, TextareaModule, TranslatePipe,
    ReactiveFormsModule, FormsModule, Button, FloatLabel, Divider, NgClass, MailAnchorComponent, PhoneComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private breakpointService = inject(BreakpointService);
  private seoService = inject(SEOService);

  emailFromGroup = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'emailToReplay': new FormControl(null, Validators.required),
    'message': new FormControl()
  });

  ngOnInit() {
    this.seoService.updateSEO(this.seoService.getContactPageSEO());

    // Structured data per i contatti
    const contactStructuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://www.knotpoet.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://www.knotpoet.com/#organization",
        "name": "KnotPoet",
        "url": "https://www.knotpoet.com",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "Booking",
            "email": "booking@knotpoet.com",
            "description": "Per richieste di concerti e booking"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Press",
            "email": "press@knotpoet.com",
            "description": "Per interviste e materiale stampa"
          },
          {
            "@type": "ContactPoint",
            "contactType": "General",
            "email": "info@knotpoet.com",
            "description": "Informazioni generali"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Management",
            "email": "management@knotpoet.com",
            "description": "Management e collaborazioni"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/knotpoet_"
        ]
      }
    };

    this.seoService.updateStructuredData(contactStructuredData);
  }

  onSubmit() {
    if (this.emailFromGroup.valid) {
      const emailToReplay = this.emailFromGroup!.get('emailToReplay')!.value;
      const name = this.emailFromGroup!.get('name')!.value;
      const message = this.emailFromGroup!.get('message')!.value;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post('https://formspree.io/f/xqabydzl',
        {name, replyto: emailToReplay, message}, {'headers': headers}).subscribe(
        {
          next: response => {
            console.log(response);
            this.emailFromGroup.reset();
          },
          error: error => {
            this.messageService.add({
              summary: 'Error',
              severity: 'error',
              detail: 'An error occurred while sending the message',
              life: 3000
            })
          },
          complete: () => {
            this.messageService.add({
              summary: 'Success',
              severity: 'success',
              detail: 'Your message has been sent',
            })
          }
        }
      );
    } else {
      this.messageService.add({
        summary: 'Error',
        severity: 'error',
        detail: 'Please fill all the fields',
        life: 3000
      });
    }
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
