import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualProfeComponent } from './manual-profe.component';

describe('ManualProfeComponent', () => {
  let component: ManualProfeComponent;
  let fixture: ComponentFixture<ManualProfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualProfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
