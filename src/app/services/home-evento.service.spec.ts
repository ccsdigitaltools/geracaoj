import { TestBed } from '@angular/core/testing';

import { HomeEventoService } from './home-evento.service';

describe('HomeEventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeEventoService = TestBed.get(HomeEventoService);
    expect(service).toBeTruthy();
  });
});
