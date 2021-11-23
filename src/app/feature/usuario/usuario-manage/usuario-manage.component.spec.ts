import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioManageComponent } from './usuario-manage.component';

describe('UsuarioManageComponent', () => {
  let component: UsuarioManageComponent;
  let fixture: ComponentFixture<UsuarioManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
