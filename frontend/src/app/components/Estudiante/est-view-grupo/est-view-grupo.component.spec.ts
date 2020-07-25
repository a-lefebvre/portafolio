import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstViewGrupoComponent } from './est-view-grupo.component';

describe('EstViewGrupoComponent', () => {
  let component: EstViewGrupoComponent;
  let fixture: ComponentFixture<EstViewGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstViewGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstViewGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
