import { TestBed, inject } from '@angular/core/testing';

import { TopBarEmitter } from './top-bar.emitter';

describe('TopBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopBarEmitter]
    });
  });

  it('should be created', inject([TopBarEmitter], (service: TopBarEmitter) => {
    expect(service).toBeTruthy();
  }));
});
