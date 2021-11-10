import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogCreateComponent } from './user-dialog-create.component';

describe('UserDialogCreateComponent', () => {
  let component: UserDialogCreateComponent;
  let fixture: ComponentFixture<UserDialogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDialogCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
