import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontDescriptionComponent } from './card-front-description.component';

describe('CardFrontDescriptionComponent', () => {
  let component: CardFrontDescriptionComponent;
  let fixture: ComponentFixture<CardFrontDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
