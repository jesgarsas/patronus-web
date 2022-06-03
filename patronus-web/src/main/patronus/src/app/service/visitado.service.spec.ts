import { TestBed } from '@angular/core/testing';

import { VisitadoService } from './visitado.service';

describe('VisitadoService', () => {
  let service: VisitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
