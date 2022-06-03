import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronManageTableComponent } from './patron-manage-table.component';

describe('PatronManageTableComponent', () => {
  let component: PatronManageTableComponent;
  let fixture: ComponentFixture<PatronManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
