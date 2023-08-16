import { TestBed } from '@angular/core/testing';

import { UserAndLekarGuardGuard } from './user-and-lekar-guard.guard';

describe('UserAndLekarGuardGuard', () => {
  let guard: UserAndLekarGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAndLekarGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
