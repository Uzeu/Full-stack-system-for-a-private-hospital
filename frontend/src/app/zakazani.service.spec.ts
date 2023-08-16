import { TestBed } from '@angular/core/testing';

import { ZakazaniService } from './zakazani.service';

describe('ZakazaniService', () => {
  let service: ZakazaniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZakazaniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
