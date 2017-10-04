import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDateComponent } from './form-control-date.component';

describe('FormControlDateComponent', () => {
  let component: FormControlDateComponent;
  let fixture: ComponentFixture<FormControlDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
