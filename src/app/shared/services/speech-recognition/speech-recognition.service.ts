import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WindowService } from './../window/window.service';

@Injectable()
export class SpeechRecognitionService {

  private recognition: any;
  private Recognition: any;

  constructor(
    private ngZone: NgZone,
    private _windowService: WindowService
  ) {
    this.createRecognition();
    this.instanceRecognition();
    this.configureRecognition();
  }

  createRecognition() {
    this.Recognition = this._windowService.window()['SpeechRecognition'] ||
                       this._windowService.window()['webkitSpeechRecognition'] ||
                       this._windowService.window()['mozSpeechRecognition'] ||
                       this._windowService.window()['msSpeechRecognition'];
  }

  instanceRecognition() {
    if (this.Recognition) {
      this.recognition = new this.Recognition();
    }
  }

  confirmCompatibility() {
    return this.recognition instanceof this.Recognition;
  }

  configureRecognition() {
    if (this.recognition) {
      this.recognition.lang = 'pt-BR';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  record(): Observable<string> {
    return Observable.create(observer => {
      this.recognition.onresult = speech => {
        const { results } = speech;
        if  (results.length) {
          const [ finalResult ] = results,
                [ result ] = finalResult;
          if (finalResult.isFinal) {
            const { confidence } = result;
            if (confidence < 0.3) {

            } else {
              this.ngZone.run(() => {
                const { transcript } = result;
                observer.next(transcript.trim());
              });
            }
          }
        }
      };
      this.recognition.onerror = error => {
        observer.error(error);
      };
      this.recognition.onend = () => {
        observer.complete();
      };
      this.recognition.start();
    });
  }

  stopRecording() {
    this.recognition.stop();
  }

}
