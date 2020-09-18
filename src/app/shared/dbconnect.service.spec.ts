import { TestBed } from '@angular/core/testing';

import { DbconnectService } from './dbconnect.service';

describe('DbconnectService', () => {
  let service: DbconnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbconnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
