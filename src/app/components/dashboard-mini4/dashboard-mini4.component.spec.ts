import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMini4Component } from './dashboard-mini4.component';

describe('DashboardMini4Component', () => {
  let component: DashboardMini4Component;
  let fixture: ComponentFixture<DashboardMini4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMini4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMini4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
