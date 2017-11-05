import { Component, OnInit } from '@angular/core';

import { WindowService } from './../../services/window/window.service';

@Component({
  selector: 'speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.styl']
})
export class SpeechRecognitionComponent implements OnInit {

  private recognition: any;

  constructor(
    private _windowService: WindowService
  ) { }

  ngOnInit() {
    const Recognition =
      this._windowService.window()['SpeechRecognition'] ||
      this._windowService.window()['webkitSpeechRecognition'] ||
      this._windowService.window()['mozSpeechRecognition'] ||
      this._windowService.window()['msSpeechRecognition'];
    this.recognition = new Recognition();
  }

  longPress(event) {
    console.log(event);
  }

  longPressing(event) {
    console.log(event);
  }

  longPressEnd(event) {
    console.log(event);
  }

}
