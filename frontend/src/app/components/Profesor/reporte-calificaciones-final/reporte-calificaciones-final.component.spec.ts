import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCalificacionesFinalComponent } from './reporte-calificaciones-final.component';

describe('ReporteCalificacionesFinalComponent', () => {
  let component: ReporteCalificacionesFinalComponent;
  let fixture: ComponentFixture<ReporteCalificacionesFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCalificacionesFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCalificacionesFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
