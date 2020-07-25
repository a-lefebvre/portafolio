import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGruposComponent } from './admin-grupos.component';

describe('AdminGruposComponent', () => {
  let component: AdminGruposComponent;
  let fixture: ComponentFixture<AdminGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
