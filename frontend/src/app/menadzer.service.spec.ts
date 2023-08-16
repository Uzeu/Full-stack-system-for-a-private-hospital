import { TestBed } from '@angular/core/testing';

import { MenadzerService } from './menadzer.service';

describe('MendazerService', () => {
  let service: MenadzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenadzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
