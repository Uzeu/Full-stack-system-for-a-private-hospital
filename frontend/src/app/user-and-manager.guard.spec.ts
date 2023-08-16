import { TestBed } from '@angular/core/testing';

import { UserAndManagerGuard } from './user-and-manager.guard';

describe('UserAndManagerGuard', () => {
  let guard: UserAndManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAndManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
