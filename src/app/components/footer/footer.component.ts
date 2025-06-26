import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'footer',
  imports: [ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);

  goToPrivacyPolicy() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/privacy-policy'])
    );

    window.open(url, '_blank');
  }
}
