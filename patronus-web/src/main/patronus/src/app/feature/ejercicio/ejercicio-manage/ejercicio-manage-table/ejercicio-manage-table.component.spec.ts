import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioManageTableComponent } from './ejercicio-manage-table.component';

describe('EjercicioManageTableComponent', () => {
  let component: EjercicioManageTableComponent;
  let fixture: ComponentFixture<EjercicioManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
