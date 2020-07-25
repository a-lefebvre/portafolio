import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstDashboardComponent } from './est-dashboard.component';

describe('EstDashboardComponent', () => {
  let component: EstDashboardComponent;
  let fixture: ComponentFixture<EstDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
