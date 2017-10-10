import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontContainerDataComponent } from './card-front-container-data.component';

describe('CardFrontContainerDataComponent', () => {
  let component: CardFrontContainerDataComponent;
  let fixture: ComponentFixture<CardFrontContainerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontContainerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontContainerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
