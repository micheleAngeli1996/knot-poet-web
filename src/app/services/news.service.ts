import {inject, Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {News} from '../models/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private firestoreService = inject(FirestoreService);

  getNews() {
   return this.firestoreService.getCollection<News>('news');
  }
}
