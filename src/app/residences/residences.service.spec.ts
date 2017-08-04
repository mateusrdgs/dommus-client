import { TestBed, inject } from '@angular/core/testing';

import { ResidencesService } from './residences.service';

describe('ResidencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidencesService]
    });
  });

  it('should be created', inject([ResidencesService], (service: ResidencesService) => {
    expect(service).toBeTruthy();
  }));
});
