import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontContainerDescriptionComponent } from './card-front-container-description.component';

describe('CardFrontContainerDescriptionComponent', () => {
  let component: CardFrontContainerDescriptionComponent;
  let fixture: ComponentFixture<CardFrontContainerDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFrontContainerDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontContainerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
