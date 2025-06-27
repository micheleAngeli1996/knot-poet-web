import {Component, inject} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../../services/members.service';

@Component({
  selector: 'about',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private membersService = inject(MembersService);

  get members() {
    return this.membersService.members;
  }

  goToMemberDetail(memberId: string) {
    this.router.navigate(['about', memberId], {relativeTo: this.route.parent});
  }
}
