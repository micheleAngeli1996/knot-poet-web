import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'page-not-found',
  imports: [
    TranslatePipe,
    Button
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  private router = inject(Router);

  goToHome() {
    this.router.navigate(['home']);
  }

}
