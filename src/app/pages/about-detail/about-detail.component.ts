import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {AsyncPipe, NgStyle, NgTemplateOutlet} from '@angular/common';
import {BreakpointService} from '../../services/breakpoint.service';
import {Observable} from 'rxjs';
import {Member} from '../../models/Members';

@Component({
  selector: 'about-detail',
  imports: [CardModule, TranslatePipe, NgStyle, NgTemplateOutlet, AsyncPipe],
  templateUrl: './about-detail.component.html',
  styleUrl: './about-detail.component.css'
})
export class AboutDetailComponent {
  private activatedRoute = inject(ActivatedRoute);
  private membersService = inject(MembersService);
  private breakpointService = inject(BreakpointService);
  member$ = new Observable<Member | undefined>();

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.member$ = this.membersService.getMember(params['id']);
    });
  }

  get isPortraitOrientation() {
    return this.breakpointService.isPortraitOrientation();
  }
}
