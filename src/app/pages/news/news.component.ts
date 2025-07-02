import {Component, inject, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {AsyncPipe, DatePipe, TitleCasePipe} from '@angular/common';
import {News} from '../../models/News';
import {Observable} from 'rxjs';
import {CardModule} from 'primeng/card';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {SEOService} from '../../services/seo.service';

@Component({
  selector: 'news',
  imports: [
    AsyncPipe,
    DatePipe,
    CardModule,
    TranslatePipe,
    TitleCasePipe
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  translateService = inject(TranslateService);
  private seoService = inject(SEOService);
  private newsService = inject(NewsService);
  news$!: Observable<News[]>;

  ngOnInit() {
    this.news$ = this.newsService.getNews();
    this.seoService.updateSEO(this.seoService.getNewsPageSEO());

    // Structured data per le news
    const newsStructuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "KnotPoet News",
      "description": "Ultime notizie e aggiornamenti dalla band KnotPoet",
      "url": "https://www.knotpoet.com/news",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Articoli e News",
        "description": "Lista delle ultime notizie di KnotPoet",
        "itemListElement": [
          {
            "@type": "Article",
            "headline": "Nuovo Album in Arrivo - Singularity",
            "description": "KnotPoet annuncia il nuovo album previsto per il 2025",
            "datePublished": "2025-01-15T10:00:00+01:00",
            "author": {
              "@type": "Organization",
              "name": "KnotPoet"
            },
            "publisher": {
              "@type": "Organization",
              "name": "KnotPoet",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.knotpoet.com/img/logos/logo.png"
              }
            },
            "url": "https://www.knotpoet.com/news/nuovo-album-dreaming-shadows"
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.knotpoet.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News",
            "item": "https://www.knotpoet.com/news"
          }
        ]
      }
    };

    this.seoService.updateStructuredData(newsStructuredData);
  }

  get lang() {
    return this.translateService.currentLang || this.translateService.defaultLang;
  }
}
