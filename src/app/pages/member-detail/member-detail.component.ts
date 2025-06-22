import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MembersService} from '../../services/members.service';
import {CardModule} from 'primeng/card';
import {TranslatePipe} from '@ngx-translate/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject, takeUntil} from 'rxjs';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'member-detail',
  imports: [CardModule, TranslatePipe, NgStyle],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent {
  memberId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private membersService = inject(MembersService);
  private breakpointObserver = inject(BreakpointObserver);
  destroyed = new Subject<void>();

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  portraitOrientation = false;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.memberId.set(params['id']);
    });
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        console.log(result.breakpoints)
        if (result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.XSmall]) {
          this.portraitOrientation = true;
        } else {
          this.portraitOrientation = false;
        }
      });
  }

  get member() {
    return this.membersService.getMember(this.memberId());
  }
}
