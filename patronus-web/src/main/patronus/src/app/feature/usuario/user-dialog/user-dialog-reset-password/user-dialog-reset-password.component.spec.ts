import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogResetPasswordComponent } from './user-dialog-reset-password.component';

describe('UserDialogResetPasswordComponent', () => {
  let component: UserDialogResetPasswordComponent;
  let fixture: ComponentFixture<UserDialogResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDialogResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
