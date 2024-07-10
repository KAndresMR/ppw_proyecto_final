import { TestBed } from '@angular/core/testing';

import { BauthService } from './bauth.service';

describe('BauthService', () => {
  let service: BauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
