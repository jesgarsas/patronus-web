import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioManageTableComponent } from './usuario-manage-table.component';

describe('UsuarioManageTableComponent', () => {
  let component: UsuarioManageTableComponent;
  let fixture: ComponentFixture<UsuarioManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
