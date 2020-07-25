import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstCriteriosComponent } from './est-criterios.component';

describe('EstCriteriosComponent', () => {
  let component: EstCriteriosComponent;
  let fixture: ComponentFixture<EstCriteriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstCriteriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
