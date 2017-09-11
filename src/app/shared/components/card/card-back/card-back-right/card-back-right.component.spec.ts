import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBackRightComponent } from './card-back-right.component';

describe('CardBackRightComponent', () => {
  let component: CardBackRightComponent;
  let fixture: ComponentFixture<CardBackRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBackRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBackRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
