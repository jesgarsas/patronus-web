import { TestBed } from '@angular/core/testing';

import { ApiPetitionsInterceptor } from './api-petitions.interceptor';

describe('ApiPetitionsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiPetitionsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiPetitionsInterceptor = TestBed.inject(ApiPetitionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
