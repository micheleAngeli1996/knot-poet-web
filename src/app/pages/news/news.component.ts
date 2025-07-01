import {Component, inject, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {News} from '../../models/News';
import {Observable} from 'rxjs';
import {CardModule} from 'primeng/card';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'news',
  imports: [
    AsyncPipe,
    DatePipe,
    CardModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  translateService = inject(TranslateService);
  private newsService = inject(NewsService);
  news$!: Observable<News[]>;

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }
}
