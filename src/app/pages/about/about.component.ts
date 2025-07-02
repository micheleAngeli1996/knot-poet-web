import {Component, inject, OnInit} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {Observable} from 'rxjs';
import {Member} from '../../models/Members';
import {SEOService} from '../../services/seo.service';

@Component({
  selector: 'about',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet, AsyncPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seoService = inject(SEOService);
  private membersService = inject(MembersService);
  members$: Observable<Member[]> = new Observable<Member[]>();

  ngOnInit() {
    this.members$ = this.membersService.getMembers();
    this.seoService.updateSEO(this.seoService.getAboutPageSEO());

    // Structured data per la pagina About
    const aboutStructuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "MusicGroup",
        "@id": "https://www.knotpoet.com/#organization",
        "name": "KnotPoet",
        "description": "KnotPoet nasce dalla fusione di suoni onirici e atmosfere metal. Ogni brano è un viaggio nel subconscio, guidato da lyriche evocative e arrangiamenti potenti.",
        "foundingDate": "2023",
        "foundingLocation": {
          "@type": "Place",
          "name": "Brescia, Italia"
        },
        "genre": ["Metal", "Progressive Metal", "Alternative Metal", "Dreaming Metal"],
        "member": [
          {
            "@type": "Person",
            "name": "Michele Angeli",
            "alternateName": "Mitch",
            "roleName": "Vocalist",
            "description": "Voce principale della band, Michele porta energia e passione in ogni performance."
          },
          {
            "@type": "Person",
            "name": "Francesco Martinelli",
            "alternateName": "Francio",
            "roleName": "Guitarist",
            "description": "Chitarrista principale, Francesco crea le atmosfere sonore uniche di KnotPoet."
          },
          {
            "@type": "Person",
            "name": "Ingemar Wust",
            "alternateName": "Ingo",
            "roleName": "Bassist",
            "description": "Chitarrista della band, Ingemar fornisce le fondamenta ritmiche solide."
          },
          {
            "@type": "Person",
            "name": "Michele Ciccia",
            "alternateName": "Echoes",
            "roleName": "Bassist",
            "description": "Bassista, Michele aggiunge le frequenze provenienti dal profondo cosmo ai brani."
          },
          {
            "@type": "Person",
            "name": "Federico Domeneghini",
            "alternateName": "Bandana",
            "roleName": "Drummer",
            "description": "Batteristia, Federico dà vita ai ritmi potenti e complessi della band."
          }
        ]
      }
    };

    this.seoService.updateStructuredData(aboutStructuredData);
  }


  goToMemberDetail(memberId: string) {
    this.router.navigate(['about', memberId], {relativeTo: this.route.parent});
  }
}
