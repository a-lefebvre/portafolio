import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCriteriosComponent } from './view-criterios.component';

describe('ViewCriteriosComponent', () => {
  let component: ViewCriteriosComponent;
  let fixture: ComponentFixture<ViewCriteriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCriteriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
