import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmailRequest} from '../models/MailRequest';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'http://localhost:3000/send-email'; // Replace with your backend URL
  private http = inject(HttpClient);

  sendEmail(emailRequest: EmailRequest) {
    return this.http.post(this.emailUrl, emailRequest);
  }
}
