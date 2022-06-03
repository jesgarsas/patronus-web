import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogImportComponent } from './user-dialog-import.component';

describe('UserDialogImportComponent', () => {
  let component: UserDialogImportComponent;
  let fixture: ComponentFixture<UserDialogImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDialogImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
