import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineChartComponent } from './src/line-chart/line-chart.component';
import { BarChartComponent } from './src/bar-chart/bar-chart.component';
import { ChartService } from './src/chart.service';

export * from './src/chart.service';
export * from './src/enums';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BarChartComponent,
    LineChartComponent
  ],
  exports: [
    BarChartComponent,
    LineChartComponent
  ],
  providers: [ChartService]

})

export class ChartsModule {
  static forRoot(chartservice: ChartService): ModuleWithProviders {
    return {
      ngModule: ChartsModule,
      providers: [ChartService]
    };
  }
}
