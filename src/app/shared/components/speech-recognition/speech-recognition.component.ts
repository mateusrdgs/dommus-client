import { Component, OnInit } from '@angular/core';

import { SocketIoService } from './../../services/socket-io/socket-io.service';
import { SpeechRecognitionService } from './../../services/speech-recognition/speech-recognition.service';

@Component({
  selector: 'speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.styl']
})
export class SpeechRecognitionComponent implements OnInit {

  public compatible: boolean;
  public recording: boolean;

  constructor(
    private _socketIoService: SocketIoService,
    private _speechRecognitionService: SpeechRecognitionService
  ) { }

  ngOnInit() {
    this.confirmCompatibility();
  }

  confirmCompatibility() {
    this.compatible = this._speechRecognitionService.confirmCompatibility();
  }

  longPress(event) {
    this.toggleRecording();
    this._speechRecognitionService
        .record()
        .subscribe(value => {
          this._socketIoService.emitMessage('component:StateVoice', value);
        }, error => {
          this.toggleRecording();
          console.error(error);
        }, () => {
          this.toggleRecording();
          console.log('Record finished!');
        });
  }

  toggleRecording() {
    this.recording = !this.recording;
  }

  longPressing(event) {

  }

  longPressEnd(event) {
    this._speechRecognitionService.stopRecording();
  }

}
