import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstCalifActividadesComponent } from './est-calif-actividades.component';

describe('EstCalifActividadesComponent', () => {
  let component: EstCalifActividadesComponent;
  let fixture: ComponentFixture<EstCalifActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstCalifActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstCalifActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
