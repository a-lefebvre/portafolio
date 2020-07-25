import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewEstudiantesComponent } from './view-new-estudiantes.component';

describe('ViewNewEstudiantesComponent', () => {
  let component: ViewNewEstudiantesComponent;
  let fixture: ComponentFixture<ViewNewEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
