import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SEOConfig} from '../models/Seo';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  /**
   * Aggiorna tutti i meta tag per una pagina specifica
   */
  updateSEO(config: SEOConfig) {
    // Aggiorna il titolo
    this.title.setTitle(config.title);

    // Meta tag base
    this.meta.updateTag({name: 'description', content: config.description});
    this.meta.updateTag({name: 'keywords', content: config.keywords || ''});
    this.meta.updateTag({name: 'robots', content: config.robots || 'index, follow'});

    // Canonical URL
    const canonicalUrl = config.canonicalUrl || `https://www.knotpoet.com${this.router.url}`;
    this.updateCanonical(canonicalUrl);

    // Open Graph
    this.meta.updateTag({property: 'og:title', content: config.title});
    this.meta.updateTag({property: 'og:description', content: config.description});
    this.meta.updateTag({property: 'og:url', content: canonicalUrl});
    this.meta.updateTag({property: 'og:type', content: config.type || 'website'});

    if (config.image) {
      this.meta.updateTag({property: 'og:image', content: config.image});
      this.meta.updateTag({property: 'og:image:width', content: '1200'});
      this.meta.updateTag({property: 'og:image:height', content: '630'});
    }

    // Twitter Card
    this.meta.updateTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.updateTag({name: 'twitter:title', content: config.title});
    this.meta.updateTag({name: 'twitter:description', content: config.description});
    if (config.image) {
      this.meta.updateTag({name: 'twitter:image', content: config.image});
    }
  }

  /**
   * Aggiorna structured data per i sitelinks
   */
  updateStructuredData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      // Rimuovi il JSON-LD esistente se presente
      const existingScript = document.getElementById('structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      // Aggiungi nuovo JSON-LD
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }

  /**
   * Aggiorna canonical URL
   */
  private updateCanonical(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  /**
   * Configurazioni SEO pre-definite per le pagine principali
   */
  getHomePageSEO(): SEOConfig {
    return {
      title: 'KnotPoet – Sito Ufficiale | Musica, News e Concerti',
      description: 'Esplora il sito ufficiale di KnotPoet per le ultime news, musica, date dei tour e contenuti esclusivi. Unisciti alla community e resta connesso.',
      keywords: 'KnotPoet, Knot Poet, metal, musica, band italiana, tour, concerti',
      image: 'https://www.knotpoet.com/img/logos/logo-og.png',
      canonicalUrl: 'https://www.knotpoet.com/'
    };
  }

  getAboutPageSEO(): SEOConfig {
    return {
      title: 'About - KnotPoet | Storia della Band e Membri',
      description: 'Scopri la storia di KnotPoet, i membri della band e il nostro viaggio musicale. Dalla formazione a Brescia nel 2023 fino ad oggi.',
      keywords: 'KnotPoet storia, membri band, biografia, Brescia, metal band italiana',
      image: 'https://www.knotpoet.com/img/about/band-photo.jpg',
      canonicalUrl: 'https://www.knotpoet.com/about'
    };
  }

  getContactPageSEO(): SEOConfig {
    return {
      title: 'Contatti - KnotPoet | Booking e Informazioni',
      description: 'Contatta KnotPoet per booking, collaborazioni, interviste e informazioni generali. Tutti i nostri contatti ufficiali.',
      keywords: 'KnotPoet contatti, booking, management, interviste, collaborazioni',
      image: 'https://www.knotpoet.com/img/contact/contact-banner.jpg',
      canonicalUrl: 'https://www.knotpoet.com/contact'
    };
  }

  getNewsPageSEO(): SEOConfig {
    return {
      title: 'News - KnotPoet | Ultime Notizie e Aggiornamenti',
      description: 'Resta aggiornato con le ultime news di KnotPoet: nuove release, concerti, interviste e tutti gli aggiornamenti dalla band.',
      keywords: 'KnotPoet news, notizie, aggiornamenti, release, concerti, interviste',
      image: 'https://www.knotpoet.com/img/news/news-banner.jpg',
      canonicalUrl: 'https://www.knotpoet.com/news'
    };
  }

  getStorePageSEO(): SEOConfig {
    return {
      title: 'Store - KnotPoet | Merchandise Ufficiale',
      description: 'Merchandise KnotPoet inclusi T-shirt, Felpe, Media, Vinili e altro. Supporta la band con i prodotti ufficiali.',
      keywords: 'KnotPoet merchandise, t-shirt metal, felpe band, vinili',
      image: 'https://www.knotpoet.com/img/store/store-banner.jpg',
      canonicalUrl: 'https://www.knotpoet.com/store'
    };
  }

  getTourPageSEO(): SEOConfig {
    return {
      title: 'Tour Date - KnotPoet | Concerti e Festival',
      description: 'Scopri le prossime date del tour di KnotPoet. Biglietti, venue e informazioni sui concerti.',
      keywords: 'KnotPoet tour, concerti, festival, biglietti, date',
      image: 'https://www.knotpoet.com/img/tour/tour-banner.jpg',
      canonicalUrl: 'https://www.knotpoet.com/tour'
    };
  }

  getMusicPageSEO(): SEOConfig {
    return {
      title: 'Musica - KnotPoet | Album e Singoli',
      description: 'Ascolta la musica di KnotPoet. Album, singoli e le ultime release della band metal italiana.',
      keywords: 'KnotPoet musica, album metal, singoli, streaming',
      image: 'https://www.knotpoet.com/img/music/music-banner.jpg',
      canonicalUrl: 'https://www.knotpoet.com/music'
    };
  }
}
