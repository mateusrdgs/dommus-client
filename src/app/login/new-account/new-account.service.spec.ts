import { LoginModule } from './../login.module';
import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { NewAccountService } from './new-account.service';

describe('NewAccountService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewAccountService,
        Http
      ]
    });
  });

  it('should be created', inject([NewAccountService], (service: NewAccountService) => {
    expect(service).toBeTruthy();
  }));
});
