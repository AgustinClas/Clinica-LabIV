import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLogsComponent } from './grafico-logs.component';

describe('GraficoLogsComponent', () => {
  let component: GraficoLogsComponent;
  let fixture: ComponentFixture<GraficoLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
