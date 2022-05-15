import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPieChartComponent } from './generic-pie-chart.component';

describe('GenericPieChartComponent', () => {
  let component: GenericPieChartComponent;
  let fixture: ComponentFixture<GenericPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
