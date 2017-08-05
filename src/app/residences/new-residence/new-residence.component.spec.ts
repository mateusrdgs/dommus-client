import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResidenceComponent } from './new-residence.component';

describe('NewResidenceComponent', () => {
  let component: NewResidenceComponent;
  let fixture: ComponentFixture<NewResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
