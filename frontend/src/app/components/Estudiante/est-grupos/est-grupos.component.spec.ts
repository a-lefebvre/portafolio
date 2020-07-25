import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstGruposComponent } from './est-grupos.component';

describe('EstGruposComponent', () => {
  let component: EstGruposComponent;
  let fixture: ComponentFixture<EstGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
