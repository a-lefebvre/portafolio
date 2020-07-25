import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEstudianteComponent } from './manual-estudiante.component';

describe('ManualEstudianteComponent', () => {
  let component: ManualEstudianteComponent;
  let fixture: ComponentFixture<ManualEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
