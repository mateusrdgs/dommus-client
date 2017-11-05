import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRecognitionComponent } from './speech-recognition.component';

describe('SpeechRecognitionComponent', () => {
  let component: SpeechRecognitionComponent;
  let fixture: ComponentFixture<SpeechRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
