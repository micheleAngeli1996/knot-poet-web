import {Component, inject} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../../services/members.service';

@Component({
  selector: 'members',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private membersService = inject(MembersService);

  constructor() {
    console.log(navigator.language)
  }
  get members() {
    return this.membersService.members;
  }

  goToMemberDetail(memberId: string) {
    this.router.navigate(['member', memberId], {relativeTo: this.route.parent});
  }

  get mitch() {
    return this.members.find(m => m.id == 'MA');
  }

  get francio() {
    return this.members.find(m => m.id == 'FM');
  }

  get ingo() {
    return this.members.find(m => m.id == 'I');
  }

  get echoes() {
    return this.members.find(m => m.id == 'MC');
  }

  get fede() {
    return this.members.find(m => m.id == 'FD');
  }
}
