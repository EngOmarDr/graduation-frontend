import { TestBed } from '@angular/core/testing';

import { AccountService } from './account-service.service';
import { provideHttpClient } from '@angular/common/http';
import {  provideHttpClientTesting } from '@angular/common/http/testing';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),provideHttpClientTesting()],
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
