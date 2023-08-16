import { TestBed } from '@angular/core/testing';

import { MenadzerGuard } from './menadzer.guard';

describe('MenadzerGuard', () => {
  let guard: MenadzerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MenadzerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
