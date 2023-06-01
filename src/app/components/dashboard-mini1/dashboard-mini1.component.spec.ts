import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMini1Component } from './dashboard-mini1.component';

describe('DashboardMini1Component', () => {
  let component: DashboardMini1Component;
  let fixture: ComponentFixture<DashboardMini1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMini1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMini1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
