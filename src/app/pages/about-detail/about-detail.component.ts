import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {NgStyle} from '@angular/common';
import {BreakpointService} from '../../services/breakpoint.service';

@Component({
  selector: 'about-detail',
  imports: [CardModule, TranslatePipe, NgStyle],
  templateUrl: './about-detail.component.html',
  styleUrl: './about-detail.component.css'
})
export class AboutDetailComponent {
  memberId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private membersService = inject(MembersService);
  private breakpointService = inject(BreakpointService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.memberId.set(params['id']);
    });
  }

  get member() {
    return this.membersService.getMember(this.memberId());
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
