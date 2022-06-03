import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputPasswordComponent } from './generic-input-password.component';

describe('GenericInputPasswordComponent', () => {
  let component: GenericInputPasswordComponent;
  let fixture: ComponentFixture<GenericInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericInputPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
