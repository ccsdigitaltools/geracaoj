import { TestBed } from '@angular/core/testing';

import { HomeNoticiaService } from './home-noticia.service';

describe('HomeNoticiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeNoticiaService = TestBed.get(HomeNoticiaService);
    expect(service).toBeTruthy();
  });
});
