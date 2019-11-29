import { TestBed } from '@angular/core/testing';

import { ReportItemResolverService } from './report-item-resolver.service';

describe('ReportItemResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportItemResolverService = TestBed.get(ReportItemResolverService);
    expect(service).toBeTruthy();
  });
});
