import { TestBed } from '@angular/core/testing';

import { EstAutGuard } from './est-aut.guard';

describe('EstAutGuard', () => {
  let guard: EstAutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstAutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
