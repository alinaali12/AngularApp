import { TestBed } from '@angular/core/testing';

import { ApiHanlderService } from './api-hanlder.service';

describe('ApiHanlderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHanlderService = TestBed.get(ApiHanlderService);
    expect(service).toBeTruthy();
  });
});
