import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronListitemComponent } from './patron-listitem.component';

describe('PatronListitemComponent', () => {
  let component: PatronListitemComponent;
  let fixture: ComponentFixture<PatronListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronListitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
