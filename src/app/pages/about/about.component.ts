import {Component, inject, OnInit} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TranslatePipe} from '@ngx-translate/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {Observable} from 'rxjs';
import {Member} from '../../models/Members';

@Component({
  selector: 'about',
  imports: [AvatarModule, CardModule, ScrollPanelModule, TranslatePipe, NgTemplateOutlet, AsyncPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private membersService = inject(MembersService);
  members$: Observable<Member[]> = new Observable<Member[]>();

  ngOnInit() {
    this.members$ = this.membersService.getMembers();
  }

  goToMemberDetail(memberId: string) {
    this.router.navigate(['about', memberId], {relativeTo: this.route.parent});
  }
}
