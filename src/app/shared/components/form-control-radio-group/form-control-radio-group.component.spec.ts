import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlFieldsetComponent } from './form-control-fieldset.component';

describe('FormControlFieldsetComponent', () => {
  let component: FormControlFieldsetComponent;
  let fixture: ComponentFixture<FormControlFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
