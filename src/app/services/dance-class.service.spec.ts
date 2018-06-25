import { TestBed, inject } from '@angular/core/testing';

import { DanceClassService } from './dance-class.service';

describe('DanceClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DanceClassService]
    });
  });

  it('should be created', inject([DanceClassService], (service: DanceClassService) => {
    expect(service).toBeTruthy();
  }));
});
