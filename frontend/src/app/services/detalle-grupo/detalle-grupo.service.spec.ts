import { TestBed } from '@angular/core/testing';

import { DetalleGrupoService } from './detalle-grupo.service';

describe('DetalleGrupoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleGrupoService = TestBed.get(DetalleGrupoService);
    expect(service).toBeTruthy();
  });
});
