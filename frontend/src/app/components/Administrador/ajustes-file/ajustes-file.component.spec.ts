import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesFileComponent } from './ajustes-file.component';

describe('AjustesFileComponent', () => {
  let component: AjustesFileComponent;
  let fixture: ComponentFixture<AjustesFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
