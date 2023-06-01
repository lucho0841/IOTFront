import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMini2Component } from './dashboard-mini2.component';

describe('DashboardMini2Component', () => {
  let component: DashboardMini2Component;
  let fixture: ComponentFixture<DashboardMini2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMini2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMini2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
