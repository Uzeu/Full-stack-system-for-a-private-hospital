import { TestBed } from '@angular/core/testing';

import { LekarGuard } from './lekar.guard';

describe('LekarGuard', () => {
  let guard: LekarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LekarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
