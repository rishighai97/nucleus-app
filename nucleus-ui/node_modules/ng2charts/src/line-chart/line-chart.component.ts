import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    providers: [ChartService]
})

export class LineChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any = {};
    @Input() data: Array<{ text: string, value: number }>;
    @ViewChild('target') target: any;

    public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!changes.data) return;
        this.data = changes.data.currentValue;

        const format = this.chart.d3.timeParse("%d-%b-%y");

        this.data.forEach((d: any) => {
            d.text = format(d.text);
            d.value = +d.value;
        });

        this.render(this.data);
    }

    ngAfterViewInit() {

    }

    render(data: any) {
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
    }
}
