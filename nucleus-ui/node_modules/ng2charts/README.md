# ng2Charts

This Library provides two different types of d3 charts
either we can use Basic charts(ex: BarChart, LineChart etc.) by using Angular module(`ChartsModule`)
or
we can use Angular 2 service (`ChartService`) which exposes d34.7 module along 
with Angular 2 predefined d3 functions 


## Import Library

Run

```js 
npm install ng2charts
```

Once installed 

```js 
import {ChartsModule, ChartService } from 'ng2charts'
```


## Utilizing Chart components

`<bar-chart [settings]="settings" [data]="dataset"></bar-chart>`

## Utilizing ChartService

import Service 

```js

import {ChartsModule, ChartService } from 'ng2charts'


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})

 public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }

     const d3 = this.chart.d3;

        const line = d3.line()
            .x((d: any) => this.chart.xscale(d.text))
            .y((d: any) => this.chart.yscale(d.value));
            
        this.chart
            .SVG(this.target.nativeElement)
            .Scale(ScaleType.Time, Axis.x)
            .RangeRound(Axis.x)
            .Domain(Axis.x, d3.extent(data, (d: any) => d.text))
            .Axis(Axis.x)
            .Scale(ScaleType.Linear, Axis.y)
            .RangeRound(Axis.y)
            .Domain(Axis.y, d3.extent(data, (d: any) => d.value))
            .Axis(Axis.y)
            .Line(data, line);
```

### for more details reference bar-chart component in src folder

### to resolve d3, Install typings (add --g to install globally)
`typings install  --save dt~d3;`


