import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {Checkbox} from 'primeng/checkbox';
import {BreakpointService} from '../../services/breakpoint.service';

@Component({
  selector: 'subscribe-form',
  templateUrl: './subscribe-form.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    InputText,
    Button,
    NgTemplateOutlet,
    Checkbox,
    NgClass
  ],
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent {
  private breakpointService = inject(BreakpointService);
  submitted = input.required<boolean>();

  subscribeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', /*[Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]*/),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    agreement: new FormControl(false)
  });

  get f() {
    return this.subscribeForm.controls;
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
