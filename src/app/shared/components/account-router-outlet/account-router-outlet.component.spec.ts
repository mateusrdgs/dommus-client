import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRouterOutletComponent } from './account-router-outlet.component';

describe('AccountRouterOutletComponent', () => {
  let component: AccountRouterOutletComponent;
  let fixture: ComponentFixture<AccountRouterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
