import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAdminComponent } from './manual-admin.component';

describe('ManualAdminComponent', () => {
  let component: ManualAdminComponent;
  let fixture: ComponentFixture<ManualAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
