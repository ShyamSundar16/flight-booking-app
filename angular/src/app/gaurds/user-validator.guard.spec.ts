import { TestBed } from '@angular/core/testing';

import { UserValidatorGuard } from './user-validator.guard';

describe('UserValidatorGuard', () => {
  let guard: UserValidatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserValidatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
