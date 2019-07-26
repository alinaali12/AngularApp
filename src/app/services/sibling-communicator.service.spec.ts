import { TestBed } from '@angular/core/testing';

import { SiblingCommunicatorService } from './sibling-communicator.service';

describe('SiblingCommunicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiblingCommunicatorService = TestBed.get(SiblingCommunicatorService);
    expect(service).toBeTruthy();
  });
});
