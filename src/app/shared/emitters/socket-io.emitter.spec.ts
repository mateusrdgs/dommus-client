import { TestBed, inject } from '@angular/core/testing';

import { SocketIoEmitter } from './socket-io.emitter';

describe('SocketIoEmitter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIoEmitter]
    });
  });

  it('should be created', inject([SocketIoEmitter], (Emitter: SocketIoEmitter) => {
    expect(Emitter).toBeTruthy();
  }));
});
