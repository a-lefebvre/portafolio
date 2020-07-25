import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstNavegacionComponent } from './est-navegacion.component';

describe('EstNavegacionComponent', () => {
  let component: EstNavegacionComponent;
  let fixture: ComponentFixture<EstNavegacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstNavegacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
