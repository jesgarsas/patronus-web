import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordChangeComponent } from './dialog-password-change.component';

describe('DialogPasswordChangeComponent', () => {
  let component: DialogPasswordChangeComponent;
  let fixture: ComponentFixture<DialogPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPasswordChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
