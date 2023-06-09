import { TestBed } from '@angular/core/testing';

import { IncarichiService } from './incarichi.service';

describe('IncarichiService', () => {
  let service: IncarichiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncarichiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
