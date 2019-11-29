import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})

export class BarChartComponent implements OnChanges, AfterViewInit {

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
        this.render(this.data);
    }

    ngAfterViewInit() {
    }

    render(data: any) {

        const d3 = this.chart.d3;


        this.chart
            .SVG(this.target.nativeElement)
            .Scale(ScaleType.Linear, Axis.x)
            .Range(Axis.x)
            .Domain(Axis.x, d3.max(this.data, (d: any) => d.value))
            .Axis(Axis.x)
            .Scale(ScaleType.Band, Axis.y)
            .Range(Axis.y)
            .Domain(Axis.y, data.map((d: any) => d.text))
            .Axis(Axis.y);


        this.chart.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this.chart.yscale(d.text))
            .attr('height', this.chart.yscale.bandwidth())
            .attr('width', (d: any) => this.chart.xscale(d.value));
    }
}
