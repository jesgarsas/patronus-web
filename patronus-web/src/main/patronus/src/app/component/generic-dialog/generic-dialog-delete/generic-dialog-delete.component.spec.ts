import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDialogDeleteComponent } from './generic-dialog-delete.component';

describe('GenericDialogDeleteComponent', () => {
  let component: GenericDialogDeleteComponent;
  let fixture: ComponentFixture<GenericDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDialogDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
