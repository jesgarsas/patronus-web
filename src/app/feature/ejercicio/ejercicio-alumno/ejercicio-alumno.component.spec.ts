import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioAlumnoComponent } from './ejercicio-alumno.component';

describe('EjercicioAlumnoComponent', () => {
  let component: EjercicioAlumnoComponent;
  let fixture: ComponentFixture<EjercicioAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
