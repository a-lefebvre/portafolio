import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMateriasComponent } from './add-materias.component';

describe('AddMateriasComponent', () => {
  let component: AddMateriasComponent;
  let fixture: ComponentFixture<AddMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
