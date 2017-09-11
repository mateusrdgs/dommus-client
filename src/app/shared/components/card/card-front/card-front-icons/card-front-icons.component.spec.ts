import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontIconsComponent } from './card-front-icons.component';

describe('CardFrontIconsComponent', () => {
  let component: CardFrontIconsComponent;
  let fixture: ComponentFixture<CardFrontIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
