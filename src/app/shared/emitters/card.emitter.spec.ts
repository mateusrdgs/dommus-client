import { TestBed, inject } from '@angular/core/testing';

import { CardEmitter } from './card.emitter';

describe('CardEmitter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardEmitter]
    });
  });

  it('should be created', inject([CardEmitter], (Emitter: CardEmitter) => {
    expect(Emitter).toBeTruthy();
  }));
});
