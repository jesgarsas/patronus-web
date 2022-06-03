import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoManageComponent } from './grupo-manage.component';

describe('GrupoManageComponent', () => {
  let component: GrupoManageComponent;
  let fixture: ComponentFixture<GrupoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
