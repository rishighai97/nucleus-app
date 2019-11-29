import { TestBed } from '@angular/core/testing';

import { GridItemResolverService } from './grid-item-resolver.service';

describe('GridItemResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridItemResolverService = TestBed.get(GridItemResolverService);
    expect(service).toBeTruthy();
  });
});
