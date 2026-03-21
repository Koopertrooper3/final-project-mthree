import { TestBed } from '@angular/core/testing';

import { GrocerService } from './grocer.service';

describe('GrocerService', () => {
  let service: GrocerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrocerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
