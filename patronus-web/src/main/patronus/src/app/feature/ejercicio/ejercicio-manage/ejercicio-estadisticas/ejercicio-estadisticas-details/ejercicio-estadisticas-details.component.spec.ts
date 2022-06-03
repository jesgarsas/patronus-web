import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioEstadisticasDetailsComponent } from './ejercicio-estadisticas-details.component';

describe('EjercicioEstadisticasDetailsComponent', () => {
  let component: EjercicioEstadisticasDetailsComponent;
  let fixture: ComponentFixture<EjercicioEstadisticasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioEstadisticasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioEstadisticasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
