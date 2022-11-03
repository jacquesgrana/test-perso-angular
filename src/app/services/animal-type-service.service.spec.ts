import { TestBed } from '@angular/core/testing';

import { AnimalTypeServiceService } from './animal-type-service.service';

describe('AnimalTypeServiceService', () => {
  let service: AnimalTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
