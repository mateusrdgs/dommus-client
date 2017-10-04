import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlHourComponent } from './form-control-hour.component';

describe('FormControlHourComponent', () => {
  let component: FormControlHourComponent;
  let fixture: ComponentFixture<FormControlHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
