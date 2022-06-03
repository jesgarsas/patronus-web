import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDatepickerRangeComponent } from './generic-datepicker-range.component';

describe('GenericDatepickerRangeComponent', () => {
  let component: GenericDatepickerRangeComponent;
  let fixture: ComponentFixture<GenericDatepickerRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDatepickerRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
