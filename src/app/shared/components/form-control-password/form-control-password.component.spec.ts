import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlPasswordComponent } from './form-control-password.component';

describe('FormControlPasswordComponent', () => {
  let component: FormControlPasswordComponent;
  let fixture: ComponentFixture<FormControlPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
