import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontContainerRangeComponent } from './card-front-container-range.component';

describe('CardFrontContainerRangeComponent', () => {
  let component: CardFrontContainerRangeComponent;
  let fixture: ComponentFixture<CardFrontContainerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontContainerRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontContainerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
