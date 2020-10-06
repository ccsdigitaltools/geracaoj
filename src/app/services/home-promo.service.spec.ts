import { TestBed } from '@angular/core/testing';

import { HomePromoService } from './home-promo.service';

describe('HomePromoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomePromoService = TestBed.get(HomePromoService);
    expect(service).toBeTruthy();
  });
});
