import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormatoComponent } from './generate-formato.component';

describe('GenerateFormatoComponent', () => {
  let component: GenerateFormatoComponent;
  let fixture: ComponentFixture<GenerateFormatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateFormatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
