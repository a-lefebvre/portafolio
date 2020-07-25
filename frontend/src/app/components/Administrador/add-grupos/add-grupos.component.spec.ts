import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGruposComponent } from './add-grupos.component';

describe('AddGruposComponent', () => {
  let component: AddGruposComponent;
  let fixture: ComponentFixture<AddGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
