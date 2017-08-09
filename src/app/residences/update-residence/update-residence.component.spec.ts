import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResidenceComponent } from './update-residence.component';

describe('UpdateResidenceComponent', () => {
  let component: UpdateResidenceComponent;
  let fixture: ComponentFixture<UpdateResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
