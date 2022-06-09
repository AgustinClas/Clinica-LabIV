import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosUsuarioComponent } from './mis-turnos-usuario.component';

describe('MisTurnosUsuarioComponent', () => {
  let component: MisTurnosUsuarioComponent;
  let fixture: ComponentFixture<MisTurnosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTurnosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTurnosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
