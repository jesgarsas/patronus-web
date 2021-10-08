import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronSearchComponent } from './patron-search.component';

describe('PatronSearchComponent', () => {
  let component: PatronSearchComponent;
  let fixture: ComponentFixture<PatronSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
