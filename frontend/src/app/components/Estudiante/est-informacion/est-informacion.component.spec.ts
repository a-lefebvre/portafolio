import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstInformacionComponent } from './est-informacion.component';

describe('EstInformacionComponent', () => {
  let component: EstInformacionComponent;
  let fixture: ComponentFixture<EstInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
