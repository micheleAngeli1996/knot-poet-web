import {inject, Injectable} from '@angular/core';
import {Firestore, collection, addDoc, serverTimestamp} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore';
import {SubscribeForm} from '../models/Subcription';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private firestore = inject(Firestore);
  private translateService = inject(TranslateService);

  async addSubscriber(subscribeForm: SubscribeForm): Promise<DocumentReference> {
    const subscribersRef = collection(this.firestore, 'subscribers');

    return await addDoc(subscribersRef, {
      ...subscribeForm,
      subscribedAt: serverTimestamp(),
      subscribed: true,
      lang: this.translateService.currentLang || this.translateService.defaultLang
    });
  }
}
