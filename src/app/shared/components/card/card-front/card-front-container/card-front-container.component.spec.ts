import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontContainerComponent } from './card-front-container.component';

describe('CardFrontContainerComponent', () => {
  let component: CardFrontContainerComponent;
  let fixture: ComponentFixture<CardFrontContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
