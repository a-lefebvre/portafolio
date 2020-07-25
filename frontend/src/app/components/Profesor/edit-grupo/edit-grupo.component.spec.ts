import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrupoComponent } from './edit-grupo.component';

describe('EditGrupoComponent', () => {
  let component: EditGrupoComponent;
  let fixture: ComponentFixture<EditGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
