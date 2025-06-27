import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDevComponent } from './about-dev.component';

describe('AboutComponent', () => {
  let component: AboutDevComponent;
  let fixture: ComponentFixture<AboutDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
