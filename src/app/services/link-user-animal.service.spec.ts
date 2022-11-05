import { TestBed } from '@angular/core/testing';

import { LinkUserAnimalService } from './link-user-animal.service';

describe('LinkUserAnimalService', () => {
  let service: LinkUserAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkUserAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
