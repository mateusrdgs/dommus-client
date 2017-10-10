import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontContainerIconComponent } from './card-front-container-icon.component';

describe('CardFrontContainerIconComponent', () => {
  let component: CardFrontContainerIconComponent;
  let fixture: ComponentFixture<CardFrontContainerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontContainerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontContainerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
