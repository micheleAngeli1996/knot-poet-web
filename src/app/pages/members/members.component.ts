import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {AnimateOnScrollModule} from 'primeng/animateonscroll';

@Component({
  selector: 'members',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet, AnimateOnScrollModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private membersService = inject(MembersService);

  get members() {
    return this.membersService.members;
  }

  goToMemberDetail(memberId: string) {
    this.router.navigate(['members', memberId], {relativeTo: this.route.parent});
  }

  getSlideEffect(memberId: string) {
    switch (memberId) {
      case 'MA':
      case 'MC':
        return 'slideInLeft';
      case 'FM':
        return 'zoomIn';
      case 'I':
      case 'FD':
        return 'slideInRight';
      default:
        return '';
    }
  }
}
