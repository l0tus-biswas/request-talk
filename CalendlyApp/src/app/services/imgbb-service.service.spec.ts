import { TestBed } from '@angular/core/testing';

import { ImgbbServiceService } from './imgbb-service.service';

describe('ImgbbServiceService', () => {
  let service: ImgbbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgbbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
