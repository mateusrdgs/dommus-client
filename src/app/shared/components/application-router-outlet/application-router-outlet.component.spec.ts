import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRouterOutletComponent } from './application-router-outlet.component';

describe('ApplicationRouterOutletComponent', () => {
  let component: ApplicationRouterOutletComponent;
  let fixture: ComponentFixture<ApplicationRouterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
