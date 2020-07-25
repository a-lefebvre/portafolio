import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCalificacionesParcialComponent } from './reporte-calificaciones-parcial.component';

describe('ReporteCalificacionesParcialComponent', () => {
  let component: ReporteCalificacionesParcialComponent;
  let fixture: ComponentFixture<ReporteCalificacionesParcialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCalificacionesParcialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCalificacionesParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
