import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontIconComponent } from './card-front-icon.component';

describe('CardFrontIconComponent', () => {
  let component: CardFrontIconComponent;
  let fixture: ComponentFixture<CardFrontIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
