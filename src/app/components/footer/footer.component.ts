import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {Router} from '@angular/router';

@Component({
  selector: 'footer',
  imports: [TranslatePipe, ButtonModule, Divider],
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
