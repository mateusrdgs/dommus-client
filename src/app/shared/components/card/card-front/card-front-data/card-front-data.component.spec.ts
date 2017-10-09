import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontDataComponent } from './card-front-data.component';

describe('CardFrontDataComponent', () => {
  let component: CardFrontDataComponent;
  let fixture: ComponentFixture<CardFrontDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
