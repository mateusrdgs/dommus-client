import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBackLeftComponent } from './card-back-left.component';

describe('CardBackLeftComponent', () => {
  let component: CardBackLeftComponent;
  let fixture: ComponentFixture<CardBackLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBackLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBackLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
