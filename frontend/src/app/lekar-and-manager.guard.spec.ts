import { TestBed } from '@angular/core/testing';

import { LekarAndManagerGuard } from './lekar-and-manager.guard';

describe('LekarAndManagerGuard', () => {
  let guard: LekarAndManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LekarAndManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
