import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstActividadesComponent } from './est-actividades.component';

describe('EstActividadesComponent', () => {
  let component: EstActividadesComponent;
  let fixture: ComponentFixture<EstActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
