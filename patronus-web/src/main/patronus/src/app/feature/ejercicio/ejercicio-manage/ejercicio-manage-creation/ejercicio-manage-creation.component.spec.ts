import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioManageCreationComponent } from './ejercicio-manage-creation.component';

describe('EjercicioManageCreationComponent', () => {
  let component: EjercicioManageCreationComponent;
  let fixture: ComponentFixture<EjercicioManageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioManageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioManageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
