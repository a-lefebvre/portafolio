import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActividadesComponent } from './view-actividades.component';

describe('ViewActividadesComponent', () => {
  let component: ViewActividadesComponent;
  let fixture: ComponentFixture<ViewActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
