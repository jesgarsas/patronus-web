import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoManageTableComponent } from './grupo-manage-table.component';

describe('GrupoManageTableComponent', () => {
  let component: GrupoManageTableComponent;
  let fixture: ComponentFixture<GrupoManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
