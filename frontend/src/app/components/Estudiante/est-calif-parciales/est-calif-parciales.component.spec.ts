import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstCalifParcialesComponent } from './est-calif-parciales.component';

describe('EstCalifParcialesComponent', () => {
  let component: EstCalifParcialesComponent;
  let fixture: ComponentFixture<EstCalifParcialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstCalifParcialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstCalifParcialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
