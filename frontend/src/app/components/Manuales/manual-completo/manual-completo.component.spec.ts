import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCompletoComponent } from './manual-completo.component';

describe('ManualCompletoComponent', () => {
  let component: ManualCompletoComponent;
  let fixture: ComponentFixture<ManualCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
