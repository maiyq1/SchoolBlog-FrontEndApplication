import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesComponent } from './evaluaciones.component';

describe('EvaluacionesComponent', () => {
  let component: EvaluacionesComponent;
  let fixture: ComponentFixture<EvaluacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionesComponent]
    });
    fixture = TestBed.createComponent(EvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
