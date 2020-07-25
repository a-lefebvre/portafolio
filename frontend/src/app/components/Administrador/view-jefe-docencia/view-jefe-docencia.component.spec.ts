import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJefeDocenciaComponent } from './view-jefe-docencia.component';

describe('ViewJefeDocenciaComponent', () => {
  let component: ViewJefeDocenciaComponent;
  let fixture: ComponentFixture<ViewJefeDocenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJefeDocenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJefeDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
