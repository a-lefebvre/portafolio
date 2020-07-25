import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficsComponent } from './grafics.component';

describe('GraficsComponent', () => {
  let component: GraficsComponent;
  let fixture: ComponentFixture<GraficsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
