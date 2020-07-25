import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriterioComponent } from './add-criterio.component';

describe('AddCriterioComponent', () => {
  let component: AddCriterioComponent;
  let fixture: ComponentFixture<AddCriterioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCriterioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
