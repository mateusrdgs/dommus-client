import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NewAccountComponent } from './new-account.component';

import { MockInvalidAccount } from './../../mocks/invalid-account.mock';
import { MockValidAccount } from './../../mocks/valid-account.mock';

describe('NewAccountComponent', () => {

  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;

  const mockInvalidAccount = new MockInvalidAccount();
  const mockValidAccount = new MockValidAccount();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ NewAccountComponent ],
      providers: [FormBuilder]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NewAccountComponent);
      component = fixture.componentInstance;
    });
  }));

  function updateForm(name, email, password, pin) {
    component.accountForm.controls['name'].setValue(name);
    component.accountForm.controls['email'].setValue(email);
    component.accountForm.controls['password'].setValue(password);
    component.accountForm.controls['confirmPassword'].setValue(password);
    component.accountForm.controls['pin'].setValue(pin);
  }

  it('should be created', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should to be invalid', fakeAsync(() => {
    expect(component.accountFormValid).toBeFalsy();
  }));

  it('should to be invalid after being filled with invalid values', fakeAsync(() => {
    component.ngOnInit();
    updateForm(mockInvalidAccount.name, mockInvalidAccount.email, mockInvalidAccount.password, mockInvalidAccount.pin);
    component.onSubmit();
    expect(component.accountFormValid).toBeFalsy();
  }));

  it('should to be valid after being filled with valid values', fakeAsync(() => {
    component.ngOnInit();
    updateForm(mockValidAccount.name, mockValidAccount.email, mockValidAccount.password, mockValidAccount.pin);
    component.onSubmit();
    expect(component.accountForm.valid).toBeTruthy();
  }));

  it('should update model on submit', fakeAsync(() => {
    component.ngOnInit();
    updateForm(mockValidAccount.name, mockValidAccount.email, mockValidAccount.password, mockValidAccount.pin);
    component.onSubmit();
    expect(component.account.name).toEqual(mockValidAccount.name);
  }));

});
