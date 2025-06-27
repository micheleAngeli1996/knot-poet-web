import {inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject, takeUntil} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);
  destroyed = new Subject<void>();

  isPortraitOrientation = signal<boolean>(false);
  isXSmall = signal(false);

  constructor() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isPortraitOrientation.set(result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.XSmall]);
        this.isXSmall.set(result.breakpoints[Breakpoints.XSmall]);
      });
  }
}
