import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewGruposComponent } from './view-new-grupos.component';

describe('ViewNewGruposComponent', () => {
  let component: ViewNewGruposComponent;
  let fixture: ComponentFixture<ViewNewGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
