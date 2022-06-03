import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioEstadisticasComponent } from './ejercicio-estadisticas.component';

describe('EjercicioEstadisticasComponent', () => {
  let component: EjercicioEstadisticasComponent;
  let fixture: ComponentFixture<EjercicioEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioEstadisticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
