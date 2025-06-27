import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAnchorComponent } from './mail-anchor.component';

describe('MailAnchorComponent', () => {
  let component: MailAnchorComponent;
  let fixture: ComponentFixture<MailAnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailAnchorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
