import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {NgStyle} from '@angular/common';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'member-detail',
  imports: [NgStyle, CardModule, TranslatePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent {
  memberId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private membersService = inject(MembersService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.memberId.set(params['id']);
    });
  }

  get member() {
    return this.membersService.getMember(this.memberId());
  }
}
