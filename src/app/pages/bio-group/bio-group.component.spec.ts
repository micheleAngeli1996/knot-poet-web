import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioGroupComponent } from './bio-group.component';

describe('BioGroupComponent', () => {
  let component: BioGroupComponent;
  let fixture: ComponentFixture<BioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
