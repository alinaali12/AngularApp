import { TestBed } from '@angular/core/testing';

import { ApiPermissionsService } from './api-permissions.service';

describe('ApiPermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPermissionsService = TestBed.get(ApiPermissionsService);
    expect(service).toBeTruthy();
  });
});
