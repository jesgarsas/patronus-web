import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoManageCreationComponent } from './grupo-manage-creation.component';

describe('GrupoManageCreationComponent', () => {
  let component: GrupoManageCreationComponent;
  let fixture: ComponentFixture<GrupoManageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoManageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoManageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
