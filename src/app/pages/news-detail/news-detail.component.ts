import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreakpointService} from '../../services/breakpoint.service';
import {Observable} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {News} from '../../models/News';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'news-detail',
  imports: [
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent {
  private activatedRoute = inject(ActivatedRoute);
  private newsService = inject(NewsService);
  private breakpointService = inject(BreakpointService);
  translateService = inject(TranslateService);
  newsById$ = new Observable<News | undefined>();

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.newsById$ = this.newsService.getNewsById(params['id']);
    });
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }

  get lang() {
    return this.translateService.currentLang || this.translateService.defaultLang;
  }
}
