import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMini3Component } from './dashboard-mini3.component';

describe('DashboardMini3Component', () => {
  let component: DashboardMini3Component;
  let fixture: ComponentFixture<DashboardMini3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMini3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMini3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
