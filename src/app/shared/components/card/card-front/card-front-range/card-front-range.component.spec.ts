import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontRangeComponent } from './card-front-range.component';

describe('CardFrontRangeComponent', () => {
  let component: CardFrontRangeComponent;
  let fixture: ComponentFixture<CardFrontRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
