// subscribe.service.ts
import {inject, Injectable} from '@angular/core';
import {Firestore, collection, addDoc, serverTimestamp} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private firestore = inject(Firestore);

  async addSubscriber(email: string): Promise<void> {
    const subscribersRef = collection(this.firestore, 'subscribers');

    await addDoc(subscribersRef, {
      email: email,
      subscribedAt: serverTimestamp(),
    });
  }
}
