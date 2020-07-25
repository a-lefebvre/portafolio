import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewProfesoresComponent } from './view-new-profesores.component';

describe('ViewNewProfesoresComponent', () => {
  let component: ViewNewProfesoresComponent;
  let fixture: ComponentFixture<ViewNewProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
