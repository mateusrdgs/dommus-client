import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComponentComponent } from './update-component.component';

describe('UpdateComponentComponent', () => {
  let component: UpdateComponentComponent;
  let fixture: ComponentFixture<UpdateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
