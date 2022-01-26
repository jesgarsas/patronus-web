import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioManageComponent } from './ejercicio-manage.component';

describe('EjercicioManageComponent', () => {
  let component: EjercicioManageComponent;
  let fixture: ComponentFixture<EjercicioManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
