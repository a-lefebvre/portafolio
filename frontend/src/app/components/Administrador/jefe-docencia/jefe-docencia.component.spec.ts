import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeDocenciaComponent } from './jefe-docencia.component';

describe('JefeDocenciaComponent', () => {
  let component: JefeDocenciaComponent;
  let fixture: ComponentFixture<JefeDocenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeDocenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
