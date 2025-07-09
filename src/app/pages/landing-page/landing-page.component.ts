import {Component, inject, OnInit} from '@angular/core';
import {BreakpointService} from '../../services/breakpoint.service';
import {NgStyle} from '@angular/common';
import {SEOService} from '../../services/seo.service';

@Component({
  selector: 'landing-page',
  imports: [NgStyle],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  private breakpointService = inject(BreakpointService);
  private seoService = inject(SEOService);

  ngOnInit() {
    // Configura SEO per la homepage
    this.seoService.updateSEO(this.seoService.getHomePageSEO());

    // Aggiungi structured data per i sitelinks
    const sitelinksStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "KnotPoet",
      "url": "https://www.knotpoet.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.knotpoet.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "hasPart": [
        {
          "@type": "WebPage",
          "name": "Store",
          "description": "Merchandise KnotPoet inclusi T-shirt, Felpe, Media, Vinili",
          "url": "https://www.knotpoet.com/store"
        },
        {
          "@type": "WebPage",
          "name": "Tour",
          "description": "Date dei concerti e biglietti per i tour di KnotPoet",
          "url": "https://www.knotpoet.com/tour"
        },
        {
          "@type": "WebPage",
          "name": "Music",
          "description": "Album, singoli e musica di KnotPoet",
          "url": "https://www.knotpoet.com/music"
        },
        {
          "@type": "WebPage",
          "name": "News",
          "description": "Ultime notizie e aggiornamenti dalla band",
          "url": "https://www.knotpoet.com/news"
        }
      ]
    };

    this.seoService.updateStructuredData(sitelinksStructuredData);
  }

  get isXSmall() {
    return this.breakpointService.isXSmall();
  }
}
