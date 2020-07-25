import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocenciaComponent } from './listar-docencia.component';

describe('ListarDocenciaComponent', () => {
  let component: ListarDocenciaComponent;
  let fixture: ComponentFixture<ListarDocenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDocenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
