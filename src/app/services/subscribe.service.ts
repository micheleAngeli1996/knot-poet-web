import {inject, Injectable} from '@angular/core';
import {Firestore, collection, addDoc, serverTimestamp} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore';
import {SubscribeForm, Subscriber} from '../models/Subcription';
import {TranslateService} from '@ngx-translate/core';
import {FirestoreService} from './firestore.service';
import {WithFieldValue} from 'firebase/firestore';
import {DocumentData} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private firestore = inject(Firestore);
  private translateService = inject(TranslateService);
  private firestoreService = inject(FirestoreService);

  getSubscriber(subscriberId: string) {
    return this.firestoreService.getDocById<Subscriber>('subscribers', subscriberId);
  }

  async addSubscriber(subscribeForm: SubscribeForm): Promise<DocumentReference> {
    const subscribersRef = collection(this.firestore, 'subscribers');

    return await addDoc(subscribersRef, {
      ...subscribeForm,
      subscribeToken: crypto.randomUUID(),
      timestamp: serverTimestamp(),
      subscribed: true,
      lang: this.translateService.currentLang || this.translateService.defaultLang
    });
  }
}
