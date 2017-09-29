import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlNumberComponent } from './form-control-number.component';

describe('FormControlNumberComponent', () => {
  let component: FormControlNumberComponent;
  let fixture: ComponentFixture<FormControlNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
