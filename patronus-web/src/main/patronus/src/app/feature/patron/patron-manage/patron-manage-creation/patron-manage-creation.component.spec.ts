import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronManageCreationComponent } from './patron-manage-creation.component';

describe('PatronManageCreationComponent', () => {
  let component: PatronManageCreationComponent;
  let fixture: ComponentFixture<PatronManageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronManageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronManageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
