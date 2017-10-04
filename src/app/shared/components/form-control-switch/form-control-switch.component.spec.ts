import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlSwitchComponent } from './form-control-switch.component';

describe('FormControlSwitchComponent', () => {
  let component: FormControlSwitchComponent;
  let fixture: ComponentFixture<FormControlSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
