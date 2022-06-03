import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronManageComponent } from './patron-manage.component';

describe('PatronManageComponent', () => {
  let component: PatronManageComponent;
  let fixture: ComponentFixture<PatronManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
