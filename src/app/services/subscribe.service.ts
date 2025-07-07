import {inject, Injectable} from '@angular/core';
import {Firestore, collection, addDoc, serverTimestamp} from '@angular/fire/firestore';
import {MailRequest} from '../models/MailRequest';
import {Functions, httpsCallable} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private firestore = inject(Firestore);
  private functions = inject(Functions);

  async addSubscriber(email: string): Promise<void> {
    const subscribersRef = collection(this.firestore, 'subscribers');

    await addDoc(subscribersRef, {
      email: email,
      subscribedAt: serverTimestamp(),
    });
  }

  sendMail(mailRequest: MailRequest) {
    httpsCallable(this.functions, 'sendMail')({mailRequest});
  }
}
