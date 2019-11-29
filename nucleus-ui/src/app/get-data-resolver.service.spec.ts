import { TestBed } from '@angular/core/testing';

import { GetDataResolverService } from './get-data-resolver.service';

describe('GetDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataResolverService = TestBed.get(GetDataResolverService);
    expect(service).toBeTruthy();
  });
});
