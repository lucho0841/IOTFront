import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederComponent } from './feeder.component';

describe('AlimentadorComponent', () => {
  let component: FeederComponent;
  let fixture: ComponentFixture<FeederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
