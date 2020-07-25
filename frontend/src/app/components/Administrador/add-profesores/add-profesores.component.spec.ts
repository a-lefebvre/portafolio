import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfesoresComponent } from './add-profesores.component';

describe('AddProfesoresComponent', () => {
  let component: AddProfesoresComponent;
  let fixture: ComponentFixture<AddProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
