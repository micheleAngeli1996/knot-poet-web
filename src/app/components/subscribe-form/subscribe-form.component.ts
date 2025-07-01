import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SubscribeService} from '../../services/subscribe.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent {
  private subscribeService = inject(SubscribeService);

  subscribeForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  submitted = false;
  successMessage = '';
  errorMessage = '';

  async onSubmit() {
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.subscribeForm.invalid) {
      return;
    }

    try {
      this.submitted = true;
      const email = this.subscribeForm.value.email;
      await this.subscribeService.addSubscriber(email);
      this.successMessage = 'Grazie per esserti iscritto!';
      this.subscribeForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      this.errorMessage = 'Si è verificato un errore, riprova più tardi.';
    }
  }
}
