import { TestBed } from '@angular/core/testing';

import { AdminAutGuard } from './admin-aut.guard';

describe('AdminAutGuard', () => {
  let guard: AdminAutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
