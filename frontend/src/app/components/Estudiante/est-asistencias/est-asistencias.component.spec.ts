import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstAsistenciasComponent } from './est-asistencias.component';

describe('EstAsistenciasComponent', () => {
  let component: EstAsistenciasComponent;
  let fixture: ComponentFixture<EstAsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstAsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
