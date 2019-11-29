/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BarChartComponent } from '../src/bar-chart/bar-chart.component';

describe('BarChartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarChartComponent
      ],
    }).compileComponents();
  });

  it('Bar chart should have a defined', async(() => {
    let fixture = TestBed.createComponent(BarChartComponent);
    let component = fixture.componentInstance;
    expect(component).toBeDefined();
  }));
});
