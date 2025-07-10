import {AfterViewInit, Component, inject} from '@angular/core';
import {EventType, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {Toast} from 'primeng/toast';
import {NgStyle} from '@angular/common';
import {BreakpointService} from './services/breakpoint.service';
import {filter} from 'rxjs';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, Toast, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  private router = inject(Router);
  private breakpointService = inject(BreakpointService);
  private platform = inject(Platform);

  title = 'knot-poet-website';
  style = {
    'background-image': 'radial-gradient(circle at center center,rgb(0 0 0), rgb(0 0 0 / 0%)), url(' + this.backgroundImage + ')'
  };

  constructor() {
    this.router.events.pipe(filter(e => e.type === EventType.NavigationEnd)).subscribe(e => {
      if (e.url.includes('privacy-policy')) {
        window.scrollTo(0, 0);
        this.style = {'background-image': 'radial-gradient(circle at center center, transparent, rgba(0,0,0 /100%), url(' + this.backgroundImage + ')'};
      } else {
        this.style = {'background-image': 'radial-gradient(circle at center center,rgb(0 0 0 / 0%), rgb(0 0 0)), url(' + this.backgroundImage + ')'};
      }
    });
  }

  ngAfterViewInit() {
    if (this.platform.IOS || this.platform.ANDROID) {
      document.querySelector('.container')?.classList.add('mobile-container');
    }
  }

  get combinedStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {...this.style};
    styles['background-size'] = !this.isPortraitOrientation ? '100% 100%' : '';

    return styles;
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }

  get isXSmall() {
    return this.breakpointService.isXSmall();
  }

  get backgroundImage() {
    if (this.isXSmall) {
      return 'img/wallpapers/nebulosa-portrait.png';
    }
    return 'img/wallpapers/nebulosa.png';
  }
}
