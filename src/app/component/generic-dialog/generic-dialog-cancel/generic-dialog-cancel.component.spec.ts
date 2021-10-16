import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDialogCancelComponent } from './generic-dialog-cancel.component';

describe('GenericDialogCancelComponent', () => {
  let component: GenericDialogCancelComponent;
  let fixture: ComponentFixture<GenericDialogCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDialogCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDialogCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
