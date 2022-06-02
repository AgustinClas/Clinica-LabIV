import { TestBed } from '@angular/core/testing';

import { UsuarioDeslogueadoGuard } from './usuario-deslogueado.guard';

describe('UsuarioDeslogueadoGuard', () => {
  let guard: UsuarioDeslogueadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioDeslogueadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
