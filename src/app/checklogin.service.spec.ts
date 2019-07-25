import { TestBed } from '@angular/core/testing';

import { CheckloginService } from './checklogin.service';

describe('CheckloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckloginService = TestBed.get(CheckloginService);
    expect(service).toBeTruthy();
  });
});
