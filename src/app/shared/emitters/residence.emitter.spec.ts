import { TestBed, inject } from '@angular/core/testing';

import { ResidenceEmitter } from './residence.emitter';

describe('ResidenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidenceEmitter]
    });
  });

  it('should be created', inject([ResidenceEmitter], (service: ResidenceEmitter) => {
    expect(service).toBeTruthy();
  }));
});
