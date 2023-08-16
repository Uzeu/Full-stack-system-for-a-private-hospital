import { TestBed } from '@angular/core/testing';

import { UserAndGuestGuard } from './user-and-guest.guard';

describe('UserAndGuestGuard', () => {
  let guard: UserAndGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAndGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
