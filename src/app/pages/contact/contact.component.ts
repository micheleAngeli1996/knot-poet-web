import {Component, inject} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FloatLabel} from 'primeng/floatlabel';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'contact',
  imports: [CardModule, InputTextModule, TextareaModule, TranslatePipe, ReactiveFormsModule, FormsModule, Button, FloatLabel, Toast],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  emailFromGroup = new FormGroup({
    'name': new FormControl(),
    'emailToReplay': new FormControl(),
    'message': new FormControl()
  });

  onSubmit() {
    if (this.emailFromGroup.valid) {
      const emailToReplay = this.emailFromGroup!.get('emailToReplay')!.value;
      const name = this.emailFromGroup!.get('name')!.value;
      const message = this.emailFromGroup!.get('message')!.value;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post('https://formspree.io/f/xeokldav',
        {name, replyto: emailToReplay, message}, {'headers': headers}).subscribe(
        {
          next: response => {
            console.log(response);
            /*this.messageService.add({
              summary: 'Success',
              severity: 'success',
              detail: 'Message sent',
              life: 3000
            });*/
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
      })
    }
  }
}
